import type { RouterContext } from "@oak/oak";

const logout = async (
  ctx: RouterContext<
    "/logout",
    Record<string | number, string | undefined>,
    // deno-lint-ignore no-explicit-any
    Record<string, any>
  >,
) => {
  // clears up cookies
  await ctx.cookies.clear({
    httpOnly: true,
    secure: false,
    signed: false,
    sameSite: "lax",
  });

  ctx.response.status = 200;
  ctx.response.body = {
    message: `User logged out.`,
    status: 200,
  };
  return;
};

export default logout;
