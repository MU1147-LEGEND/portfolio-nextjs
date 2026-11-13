export const SESSION_COOKIE_NAME = "portfolio_admin_session";

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string): Uint8Array | null {
  try {
    const padded = input.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((input.length + 3) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch {
    return null;
  }
}

export function verifyAdminPassword(
  input: string | undefined,
  expected: string | undefined = process.env.ADMIN_PASSWORD
): boolean {
  if (!input || !expected || expected.length === 0) return false;
  const a = encoder.encode(input);
  const b = encoder.encode(expected);
  const maxLen = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < maxLen; i++) {
    diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }
  return diff === 0;
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export interface SessionPayload {
  sub: string;
  exp: number;
}

export async function signSessionToken(
  sub: string,
  secret: string | undefined = process.env.AUTH_SECRET,
  ttlSeconds = 60 * 60 * 24 * 7
): Promise<string> {
  if (!secret || secret.length < 16) {
    throw new Error("AUTH_SECRET must be configured (min 16 chars)");
  }
  const payload: SessionPayload = {
    sub,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };
  const payloadB64 = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const key = await getHmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64));
  return `${payloadB64}.${toBase64Url(new Uint8Array(sig))}`;
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string | undefined = process.env.AUTH_SECRET
): Promise<SessionPayload | null> {
  if (!token || !secret || secret.length < 16) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sigB64] = parts;
  const sigBytes = fromBase64Url(sigB64);
  if (!sigBytes) return null;

  const key = await getHmacKey(secret);
  const sigBuffer = new ArrayBuffer(sigBytes.byteLength);
  new Uint8Array(sigBuffer).set(sigBytes);
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    sigBuffer,
    encoder.encode(payloadB64)
  );
  if (!valid) return null;

  const payloadBytes = fromBase64Url(payloadB64);
  if (!payloadBytes) return null;

  try {
    const parsed = JSON.parse(new TextDecoder().decode(payloadBytes)) as SessionPayload;
    if (!parsed.sub || typeof parsed.exp !== "number") return null;
    if (parsed.exp <= Math.floor(Date.now() / 1000)) return null;
    return parsed;
  } catch {
    return null;
  }
}
