import type { RouterContext } from "@oak/oak";
import { argon2Verify } from "~crypto/pwd.ts";
import { generateJwt } from "~crypto/jwt.ts";
import db from "~database/users.ts";
import type User from "~types/user.ts";
import { LoginData } from "~types/auth_request.ts";

const login = async (
  ctx: RouterContext<
    "/login",
    Record<string | number, string | undefined>,
    // deno-lint-ignore no-explicit-any
    Record<string, any>
  >,
) => {
  const loginData: LoginData | undefined = await ctx.request.body
    .json();

  if (
    !loginData || !loginData.username?.trim() ||
    !loginData.password?.trim()
  ) {
    ctx.response.status = 422;
    ctx.response.body = {
      message: "Username or password field cannot be empty.",
      status: 422,
    };
    return;
  }

  const { username, password } = loginData;

  const stmt = db.prepare(
    `
		SELECT * FROM users WHERE username = '${username}';
		`,
  );

  const row = stmt.get<User>();

  if (!row) {
    ctx.response.status = 404;
    ctx.response.body = {
      message: `User with \`${username}\` does not exist.`,
      status: 404,
    };
    return;
  }

  const { salt: originalSalt, password: originalHash } = row;
  const verified = argon2Verify(password, originalSalt, originalHash);

  if (verified) {
    const jwToken = await generateJwt(row, ctx.request.url.origin);
    if (!jwToken) {
      ctx.response.status = 503;
      ctx.response.body = {
        message: "Server Error. Unable to generate JWT.",
        status: 503,
      };
      return;
    }

    await ctx.cookies.set("user", jwToken.jwt, {
      httpOnly: true,
      secure: false,
      signed: false,
      sameSite: "lax",
      expires: new Date(jwToken.nbf),
      path: "/",
    });

    ctx.response.status = 200;
    ctx.response.body = {
      message: `Correct credentials for \`${username}\``,
      status: 200,
    };
    return;
  }

  ctx.response.status = 403;
  ctx.response.body = {
    message: "Unauthorised",
    status: 403,
  };
  return;
};

export default login;
