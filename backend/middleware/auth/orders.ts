import type { RouterContext } from "@oak/oak/router";
import PurchaseOrder from "~types/purchase_order.ts";
import { verifyJwt } from "~crypto/jwt.ts";
import db from "~database";

const orderPurchase = async (
  ctx: RouterContext<
    "/auth/orders/purchase",
    Record<string | number, string | undefined>,
    // deno-lint-ignore no-explicit-any
    Record<string, any>
  >,
) => {
  const data: PurchaseOrder | undefined = await ctx.request.body.json();

  console.log(data)

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

  const timestamp = Date.now();
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

export { orderPurchase };
