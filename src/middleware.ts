import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/config";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

const publicPages = ["/login", "/register"];

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const isPublicPage = publicPages.some((page) => {
    const segmentsPath = pathname.split("/").filter(Boolean);

    return (
      pathname === page ||
      (segmentsPath.length > 1 &&
        `/${segmentsPath.slice(1).join("/")}` === page)
    );
  });

  if (!token && !isPublicPage) {
    const locale =
      request.cookies.get("NEXT_LOCALE")?.value || routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  if (token && isPublicPage) {
    const locale =
      request.cookies.get("NEXT_LOCALE")?.value || routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
