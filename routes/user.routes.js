import {Router} from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
    return res.send({title: "Get all users"})
});
userRouter.get("/:id", (req, res) => res.send({title: "Get user details"}))
userRouter.post("/", (req, res) => res.send({title: "Create a new user"}));
userRouter.put("/:id", (req, res) => res.send({title: "Update a user"}));
userRouter.delete("/:id", (req, res) => res.sned({title: "Delete user a user"}));

export default userRouter;