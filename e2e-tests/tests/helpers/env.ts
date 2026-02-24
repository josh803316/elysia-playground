export function requireEnvVars(required: string[], context: string): void {
  const missing = required.filter((key) => {
    const val = process.env[key];
    return val === undefined || val === null || String(val).trim() === '';
  });

  if (missing.length > 0) {
    throw new Error(
      `[env:${context}] Missing required environment variables: ${missing.join(
        ', '
      )}. Check e2e-tests/.env and your server env before running tests.`
    );
  }
}

