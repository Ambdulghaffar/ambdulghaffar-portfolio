import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    // Required because the root layout lives under the `[locale]` dynamic
    // segment (see src/app/[locale]/layout.tsx) — without this flag, the
    // default root `not-found.tsx` renders nested inside Next's implicit
    // root layout, producing invalid duplicate `<html>`/`<body>` tags.
    globalNotFound: true,
  },
};

export default withNextIntl(nextConfig);
