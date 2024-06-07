import { Router } from "express";
import { userLogin, userRegister } from "../controllers/user.controller.js";
import { updateBlog } from "../controllers/blog.controller.js";

const router = Router()

router.post('/userRegister' , userRegister );

router.post('/userLogin' , userLogin);

router.put('/updateBody' , updateBlog);


export default router;