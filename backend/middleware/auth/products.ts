import type { RouterContext } from "@oak/oak/router";
import db from "~database/main.ts";

const view = (
  ctx: RouterContext<
    "/auth/products/view",
    Record<string | number, string | undefined>,
    // deno-lint-ignore no-explicit-any
    Record<string, any>
  >,
) => {
  const stmt = db.prepare(
    `
    SELECT * from products
    `,
  );

  const rows = stmt.all();

  ctx.response.status = 200;
  ctx.response.body = {
    message: rows,
    status: 200,
  };
  return;
};

export default view;
