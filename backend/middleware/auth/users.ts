import type { RouterContext } from "@oak/oak/router";
import User from "~types/user.ts";
import db from "~database";

const getUserNameById = (
  ctx: RouterContext<
    "/auth/users/:id",
    { id: string } & Record<string | number, string | undefined>,
    // deno-lint-ignore no-explicit-any
    Record<string, any>
  >,
) => {
  // Extract and validate id
  const id = Number(ctx.params.id);
  if (!id) {
    ctx.response.status = 400;
    ctx.response.body = { error: "ID is required" };
    return;
  }
  else if (!Number.isInteger(id)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "ID should be a integer" };
    return;
  }

  const stmt = db.prepare(
    `
    SELECT * FROM users
    WHERE id = ?;
    `,
  );
  const row = stmt.get<User>(id);
  if (!row) {
    ctx.response.status = 404;
    ctx.response.body = { error: "Order not found" };
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = {
    message: row.username,
    status: 200,
  };
  return;
};

export { getUserNameById };
