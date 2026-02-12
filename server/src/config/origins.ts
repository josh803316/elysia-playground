type EnvLike = Record<string, string | undefined>;

const DEV_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:6173",
];

const splitList = (value?: string): string[] =>
  (value ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

const normalizeOrigin = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const withProtocol =
    /^https?:\/\//i.test(trimmed) || trimmed.startsWith("//")
      ? trimmed
      : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    return `${url.protocol}//${url.host}`;
  } catch {
    return null;
  }
};

export function getAllowedOrigins(env: EnvLike = process.env): string[] {
  const configuredOrigins = splitList(env.CORS_ORIGINS);
  const configuredAuthorizedParties = splitList(env.CLERK_AUTHORIZED_PARTIES);

  const appUrl = env.APP_URL ?? env.VITE_APP_URL;
  const vercelUrl = env.VERCEL_URL ? `https://${env.VERCEL_URL}` : undefined;

  const rawOrigins = [
    ...DEV_ORIGINS,
    ...configuredOrigins,
    ...configuredAuthorizedParties,
    ...(appUrl ? [appUrl] : []),
    ...(vercelUrl ? [vercelUrl] : []),
  ];

  const deduped = new Set<string>();
  for (const origin of rawOrigins) {
    const normalized = normalizeOrigin(origin);
    if (normalized) deduped.add(normalized);
  }

  return [...deduped];
}
