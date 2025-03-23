import type { RouterContext } from "@oak/oak/router";
import PurchaseOrder from "~types/purchase_order.ts";
import { verifyJwt } from "~crypto/jwt.ts";
import db from "~database";

const view = (
  ctx: RouterContext<
    "/auth/orders/:id",
    { id: string } & Record<string | number, string | undefined>,
    // deno-lint-ignore no-explicit-any
    Record<string, any>
  >,
) => {
  // Extract and validate id
  const id = Number(ctx.params.id);
  if (!id) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Order ID is required" };
    return;
  }
  else if (!Number.isInteger(id)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Order ID should be a integer" };
    return;
  }

  const stmt = db.prepare(
    `
    SELECT * FROM purchase_orders
    WHERE id = ?;
    `,
  );
  const row = stmt.get<PurchaseOrder>(id);
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

const create = async (
  ctx: RouterContext<
    "/auth/orders/purchase",
    Record<string | number, string | undefined>,
    // deno-lint-ignore no-explicit-any
    Record<string, any>
  >,
) => {
  const data: PurchaseOrder | undefined = await ctx.request.body.json();

  // Gets userId from JWT
  const jwtFromCookie = await ctx.cookies.get("user") || "";
  const { uid: userId } = await verifyJwt(jwtFromCookie);

  if (
    !data ||
    !data.bill_to?.trim() ||
    !data.deliver_to?.trim() ||
    !Array.isArray(data.items) ||
    data.items.length === 0 ||
    !data.items.every(item => item.product && item.qty > 0)
  ) {
    ctx.response.status = 422;
    ctx.response.body = {
        message: "Missing or invalid field(s).",
        status: 422,
    };
    return;
  }

  const timestamp = (new Date()).toISOString();
  const { bill_to, deliver_to, items } = data;

  const changes = db.exec(
    `
    INSERT INTO purchase_orders(timestamp, items, bill_to, deliver_to, requester, status)
    VALUES (?, ?, ?, ?, ?, ?);
    `,
    [
      timestamp,
      JSON.stringify(items),
      bill_to,
      deliver_to,
      userId,
      "Created",
    ],
  );

  if (changes > 0) {
    ctx.response.status = 200;
    ctx.response.body = {
      message: `Purchase order created successfully.`,
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

// const update = async (
//   ctx: RouterContext<
//     "/auth/orders/update",
//     Record<string | number, string | undefined>,
//     // deno-lint-ignore no-explicit-any
//     Record<string, any>
//   >,
// ) => {
//   const data: PurchaseOrder | undefined = await ctx.request.body.json();

//   // TODO: implement
// }

export { view, create, /*update*/ };
