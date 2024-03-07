import express from "express";

import {getAllUsers,getUser,deleteUser,updateUser} from '../controllers/user.controller.js';
import {isLoggedIn, isOwner} from "../middleware/index.js"


const router = express.Router();

router.route('/getUsers').get(isLoggedIn,getAllUsers);
router.route('/getUser/:id').get(isLoggedIn,isOwner,getUser);
router.route('/deleteUser/:id').delete(isLoggedIn,isOwner,deleteUser);
router.route('/updateUser/:id').patch(isLoggedIn,isOwner,updateUser);

export default router;