import test from "node:test";
import assert from "node:assert/strict";
import {
  verifyAdminPassword,
  signSessionToken,
  verifySessionToken,
} from "../lib/auth.ts";

test("verifyAdminPassword fails closed when expected password is empty or missing", () => {
  assert.equal(verifyAdminPassword("secret", ""), false);
  assert.equal(verifyAdminPassword("secret", undefined), false);
  assert.equal(verifyAdminPassword("", "secret"), false);
});

test("verifyAdminPassword accepts matching password and rejects mismatched password", () => {
  assert.equal(verifyAdminPassword("correct-horse", "correct-horse"), true);
  assert.equal(verifyAdminPassword("wrong-horse", "correct-horse"), false);
  assert.equal(verifyAdminPassword("correct", "correct-horse"), false);
});

test("signSessionToken and verifySessionToken round-trip valid session", async () => {
  const secret = "test-secret-key-at-least-32-chars-long";
  const token = await signSessionToken("admin", secret, 60);
  const payload = await verifySessionToken(token, secret);
  assert.ok(payload);
  assert.equal(payload.sub, "admin");
});

test("verifySessionToken rejects tampered or expired tokens and missing secret", async () => {
  const secret = "test-secret-key-at-least-32-chars-long";
  const token = await signSessionToken("admin", secret, 60);
  const tampered = token.slice(0, -2) + (token.endsWith("ab") ? "cd" : "ab");

  assert.equal(await verifySessionToken(tampered, secret), null);
  assert.equal(await verifySessionToken(token, "wrong-secret-key-32-chars-minimum"), null);
  assert.equal(await verifySessionToken(token, ""), null);

  const expired = await signSessionToken("admin", secret, -10);
  assert.equal(await verifySessionToken(expired, secret), null);
});
