// Example middleware.js file for security

// import { NextResponse } from "next/server";

// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";

// const redis = new Redis({
//   url: "https://also-secret.upstash.io",
//   token: "SECRET_TOKEN",
// });
// const ratelimit = new Ratelimit({
//   redis,

//   // 5 requests per minute max, otherwise probably a bot
//   limiter: Ratelimit.slidingWindow(5, "60 s"),
// });

// export default async function middleware(req) {
//   const ip = req.ip ?? "127.0.0.1";
//   // success will be true if the request is allowed, false if it is blocked
//   const { success, pending, limit, remaining, reset } = await ratelimit.limit(
//     ip
//   );
//   return success
//     ? NextResponse.next()
//     : NextResponse.redirect(new URL("/blocked", req.url));
// }

// export const config = {
//   matcher: ["/api/:path*", "/dashboard/:path*"],
// };

// need this for app to work
export default function middlewareExample(req) {
  const url = req.nextUrl;
  if (url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }
}
