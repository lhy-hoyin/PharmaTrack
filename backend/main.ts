import { Application, Router } from "@oak/oak";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { login, register } from "~middleware";
import checkAuth from "~crypto/auth.ts";

const router = new Router();
const authRouter = new Router();
const app = new Application();
const controller = new AbortController();

router.post("/register", register);
router.post("/login", login);

app.use(oakCors({
  origin: "http://127.0.0.1:3000",
  optionsSuccessStatus: 200,
  credentials: true, // Allow credentials (cookies) to be included in requests
}));
app.use(router.allowedMethods());
app.use(router.routes());
app.use(authRouter.allowedMethods());
app.use(checkAuth, authRouter.routes());

if (import.meta.main) {
  app.listen(
    {
      port: 5555,
      signal: controller.signal,
    },
  );
}
