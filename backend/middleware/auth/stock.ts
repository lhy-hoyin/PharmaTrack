import type { RouterContext } from "@oak/oak/router";
import db from "~database/products.ts";
import Product from "~types/product.ts";

const view = (
  ctx: RouterContext<
    "/auth/do-something",
    Record<string | number, string | undefined>,
    // deno-lint-ignore no-explicit-any
    Record<string, any>
  >,
) => {
  const stmt = db.prepare(
    `
    SELECT id, product_id, name, manufacturer, SUM(quantity) as total_qty
    FROM products
    GROUP BY product_id
    `,
  );

  const rows = stmt.all<Product>();

  ctx.response.status = 200;
  ctx.response.body = {
    message: rows,
    status: 200,
  };
  return;
};

export default view;
