import type { RouterContext } from "@oak/oak/router";
import db from "~database";
import Product from "~types/product.ts";

const view = (
  ctx: RouterContext<
    "/auth/products/view",
    { id: string } & Record<string | number, string | undefined>,
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

const info = (
  ctx: RouterContext<
    "/auth/products/:id",
    { id: string } & Record<string | number, string | undefined>,
    // deno-lint-ignore no-explicit-any
    Record<string, any>
  >,
) => {
  // Extract and validate id
  const id = Number(ctx.params.id);
  if (!id) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Product ID is required" };
    return;
  }
  else if (!Number.isInteger(id)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Product ID should be a integer" };
    return;
  }

  const stmt = db.prepare(
    `
    SELECT * FROM products
    WHERE id = ?;
    `,
  );
  const row = stmt.get<Product>(id);
  if (!row) {
    ctx.response.status = 404;
    ctx.response.body = { error: "Order not found" };
    return;
  }

  ctx.response.status = 200;
  ctx.response.body = {
    message: row,
    status: 200,
  };
  return;
};

const add = async (
  ctx: RouterContext<
    "/auth/products/add",
    Record<string | number, string | undefined>,
    // deno-lint-ignore no-explicit-any
    Record<string, any>
  >,
) => {
  const data: Product | undefined = await ctx.request.body.json();

  if (
    !data || 
    !data.name?.trim() ||
    !data.manufacturer?.trim() ||
    !data.supplier?.trim()
  ) {
    ctx.response.status = 422;
    ctx.response.body = {
      message: "Missing or empty field(s).",
      status: 422,
    };
    return;
  }

  const { name, description, manufacturer, supplier } = data;

  const stmt = db.prepare(
    `
    SELECT * FROM products
    WHERE name = '${name}' 
    AND manufacturer = '${manufacturer}'
    AND supplier = '${supplier}';
    `,
  );

  const row = stmt.get<Product>();
  if (row) {
    // Product exists in database
    ctx.response.status = 409;
    ctx.response.body = {
      message: 'Product already exists.',
      status: 409,
    };
    return;
  }
  
  const changes = db.exec(
    `
    INSERT INTO products(name, description, manufacturer, supplier)
    VALUES ('${name}', '${description}', '${manufacturer}', '${supplier}');
    `,
  );

  if (changes > 0) {
    ctx.response.status = 200;
    ctx.response.body = {
      message: `Product added.`,
      status: 200,
    };
    return;
  }

  ctx.response.status = 503;
  ctx.response.body = {
    message: `Server Error.`,
    status: 503,
  };
  return;
};

export { view, info, add };
