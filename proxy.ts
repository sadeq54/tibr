import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const res = intlMiddleware(req);
  if (res) {
    res.headers.set("x-pathname", req.nextUrl.pathname);
  }
  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|icon|apple-icon|opengraph-image|sitemap.xml|robots.txt|favicon.ico|.*\\..*).*)",
  ],
};
