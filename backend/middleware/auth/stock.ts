import type { RouterContext } from "@oak/oak/router";
import db from "~database";

const view = (
  ctx: RouterContext<
    "/auth/stock/view",
    Record<string | number, string | undefined>,
    // deno-lint-ignore no-explicit-any
    Record<string, any>
  >,
) => {
  const stmt = db.prepare(
    `
    SELECT p.id, p.name, p.manufacturer, SUM(s.quantity) as total_qty
    FROM products p
    JOIN stock s ON p.id = s.product_id
    GROUP BY p.id, p.name, p.manufacturer
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
