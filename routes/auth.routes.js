import {Router} from "express";

const authRouter = Router();

authRouter.get("/sign-up", (req, res) => {
    return res.send({title: "Sign Up"});
})
authRouter.get("/sign-in", (req, res) => {
    return res.send({title: "Sign in"});
})
authRouter.get("/sign-out", (req, res) => {
    return res.send({title: "Sign out"});
})

export default authRouter;