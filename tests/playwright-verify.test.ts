import test from "node:test";
import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
import fs from "node:fs";
import { spawn, type ChildProcess } from "node:child_process";
import http from "node:http";

function waitForServer(url: string, timeout = 30000): Promise<void> {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function check() {
      http.get(url, (res) => {
        if (res.statusCode && res.statusCode < 500) {
          resolve();
        } else {
          retry();
        }
      }).on("error", () => {
        retry();
      });
    }

    function retry() {
      if (Date.now() - start > timeout) {
        reject(new Error(`Timeout waiting for ${url}`));
      } else {
        setTimeout(check, 500);
      }
    }

    check();
  });
}

test("live screenshot capture and e2e Playwright UI verification", async () => {
  const TEST_PORT = 3088;
  const BASE_URL = `http://localhost:${TEST_PORT}`;

  // Start Next.js production server on isolated port
  const nextProcess: ChildProcess = spawn(
    "node",
    ["./node_modules/next/dist/bin/next", "start", "-p", String(TEST_PORT)],
    {
      stdio: "pipe",
      env: { ...process.env, PORT: String(TEST_PORT) },
    }
  );

  let serverOutput = "";
  nextProcess.stdout?.on("data", (d) => {
    serverOutput += d.toString();
  });
  nextProcess.stderr?.on("data", (d) => {
    serverOutput += d.toString();
  });

  const browser = await chromium.launch({ headless: true });

  try {
    console.log(`Waiting for Next.js server on ${BASE_URL}...`);
    await waitForServer(BASE_URL, 20000);
    console.log("Next.js server is ready!");

    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();

    // 1. Visit Homepage
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    const pageTitle = await page.title();
    console.log("Homepage title:", pageTitle);
    assert.ok(pageTitle.includes("Mohammad Ullah"));

    // 2. Verify Selected Work has EXACTLY the 5 projects in order
    const projectOptions = await page
      .locator('[role="listbox"][aria-label="Featured projects"] [role="option"]')
      .allInnerTexts();
    console.log("Selected Work items:", projectOptions);

    assert.equal(projectOptions.length, 5, "Must have exactly 5 selected projects");

    // 1. SanchayanBD (fintech)
    assert.ok(projectOptions[0].includes("SanchayanBD"), "Project 1 must be SanchayanBD");
    assert.ok(projectOptions[0].includes("fintech"), "Project 1 domain must be fintech");

    // 2. NextiPress (saas)
    assert.ok(projectOptions[1].includes("NextiPress"), "Project 2 must be NextiPress");
    assert.ok(projectOptions[1].includes("saas"), "Project 2 domain must be saas");

    // 3. BASATI Institute (edtech)
    assert.ok(projectOptions[2].includes("BASATI Institute"), "Project 3 must be BASATI Institute");
    assert.ok(projectOptions[2].includes("edtech"), "Project 3 domain must be edtech");

    // 4. Focus Dock (productivity)
    assert.ok(projectOptions[3].includes("Focus Dock"), "Project 4 must be Focus Dock");
    assert.ok(projectOptions[3].includes("productivity"), "Project 4 domain must be productivity");

    // 5. YuCar Rental (Team Project) (travel / team)
    assert.ok(projectOptions[4].includes("YuCar Rental"), "Project 5 must be YuCar Rental");
    assert.ok(projectOptions[4].includes("Team Project"), "Project 5 must indicate Team Project");
    assert.ok(projectOptions[4].includes("travel / team"), "Project 5 domain must be travel / team");

    // 3. Test interaction: click each project and verify preview image updates
    for (let i = 0; i < 5; i++) {
      await page
        .locator('[role="listbox"][aria-label="Featured projects"] [role="option"]')
        .nth(i)
        .click();
      await page.waitForTimeout(400);

      const frameImg = page.locator("#work .aspect-\\[16\\/10\\] img").first();
      const src = await frameImg.getAttribute("src");
      const alt = await frameImg.getAttribute("alt");
      console.log(`Project ${i + 1} active preview: alt="${alt}", src="${src}"`);
      assert.ok(src && src.length > 0, `Project ${i + 1} must have a valid preview image`);
    }

    // 4. Verify Education & Credentials
    const credentialsText = await page.locator("#credentials-heading ~ div, section[aria-labelledby='credentials-heading']").innerText();
    assert.equal(credentialsText.includes("Alim"), false, "Alim (HSC) must be completely removed");
    assert.ok(
      credentialsText.includes("Reactive Accelerator — Batch 3") && credentialsText.includes("Learn With Sumit"),
      "Learn With Sumit (LWS) Reactive Accelerator Batch 3 must be present"
    );

    // 5. Verify full /work archive
    await page.goto(`${BASE_URL}/work`, { waitUntil: "networkidle" });
    const workItems = await page.locator("article").count();
    console.log("Total projects on /work archive:", workItems);
    assert.ok(workItems >= 15, "Full work archive must show all projects");

    // 6. Verify Footer does NOT have Admin Panel link
    const footerText = await page.locator("footer").innerText();
    assert.equal(footerText.includes("Admin Panel"), false, "Footer must NOT have Admin Panel link");

    // 7. Verify /dev-admin route security & redirect
    await page.goto(`${BASE_URL}/dev-admin`, { waitUntil: "networkidle" });
    assert.ok(page.url().includes("/dev-admin/login"), "Unauthenticated /dev-admin must redirect to /dev-admin/login");

    // Capture visual proof of the 5 projects on the homepage
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await page.screenshot({ path: "public/assets/playwright-verified-home.png" });
    console.log("Saved Playwright visual proof to public/assets/playwright-verified-home.png");
  } finally {
    await browser.close();
    nextProcess.kill("SIGTERM");
  }
});
