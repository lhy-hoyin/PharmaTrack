import { verifyJwt } from "~crypto/jwt.ts";
import type { Context, Next } from "@oak/oak";

/**
Checks if user is authenticated by checking the request cookie
and the Authorization header. Then the JWT tokens are pulled
from both cookie and header and then compared if it matches.

If they don't match, then function just early returns with
null/undefined.

Otherwise, `next` function will be called.
 */
const checkAuth = async (
  ctx: Context,
  next: Next,
) => {
  const pathname = decodeURIComponent(ctx.request.url.pathname);
  if (!pathname.startsWith("/auth")) {
    ctx.response.status = 404;
    ctx.response.body = {
      message: "Bad Request",
      status: 404,
    };
    return;
  }

  const jwtFromCookie = await ctx.cookies.get("user");
  const authHeader = ctx.request.headers.get("Authorization");
  const [, jwt] = authHeader ? authHeader.split(" ") : [null, null];

  console.info(`Has Cookie: ${jwtFromCookie !== undefined}`);
  console.info(`Has Auth Header: ${authHeader !== null}`);

  // For stronger auth, require both jwt and jwtFromCookie
  if (!jwt && !jwtFromCookie) {
    ctx.response.status = 403;
    ctx.response.body = {
      message: "Missing credentials. Not authenticated.",
      status: 403,
    };
    return;
  }

  // Weak auth, only checking from cookie
  if (jwtFromCookie !== undefined) {
    //console.info("Cookie", jwtFromCookie);
    try {
      const payload = await verifyJwt(jwtFromCookie);
      // console.log(payload);
    } catch(_) {
      ctx.response.status = 403;
      ctx.response.body = {
        message: "Not authenticated",
        status: 403,
      };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = {
      message: "Authenticated",
      status: 200,
    };
  }

  // Stronger auth
  // if (jwt === jwtFromCookie) {
  //   const payload1 = await verifyJwt(jwtFromCookie);
  //   const payload2 = await verifyJwt(jwt);

  //   if (payload1.user === payload2.user) {
  //     ctx.response.status = 200;
  //     ctx.response.body = {
  //       message: "Authenticated",
  //       status: 200,
  //     };
  //   }
  // } else {
  //   ctx.response.status = 403;
  //   ctx.response.body = {
  //     message: "Not authenticated",
  //     status: 403,
  //   };
  //   return;
  // }

  return await next();
};

export default checkAuth;
