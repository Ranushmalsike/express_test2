import Router from "express";
import { ItemDetails } from "../utiliti/productItem.mjs";
// import { cookieParser } from "cookie-parser";

const router = Router();

router.get('/api/products', (req, res) => {
     console.log(req.headers.cookie);
     console.log(req.cookies);
     console.log(req.signedCookies.hello);
     if(req.signedCookies.hello && req.signedCookies.hello === "World")
        return res.send(ItemDetails);
     return res.status(405).send({ msg: "You have need correct cookie" });   
});

export default router;