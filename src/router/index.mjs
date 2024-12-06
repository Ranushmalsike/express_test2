import Router from "express";
import  routeUser  from "./router.mjs";
import  productRouter  from "./product.mjs";
const router = Router();

router.use(routeUser);
router.use(productRouter);

export default router
