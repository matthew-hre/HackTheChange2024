import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const rootUrl = new URL(request.url);
  rootUrl.pathname = "/";

  return NextResponse.redirect(rootUrl);
}
