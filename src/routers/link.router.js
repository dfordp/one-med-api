import express from "express";
import {getAllLinks, getLink, deleteLink, updateLink} from '../controllers/link.controller.js';
import {isLoggedIn, isOwner} from "../middleware/index.js"

const router = express.Router();

router.route('/getLinks').get(isLoggedIn, getAllLinks);
router.route('/getLink/:id').get(isLoggedIn, isOwner, getLink);
router.route('/deleteLink/:id').delete(deleteLink);
router.route('/updateLink/:id').patch(updateLink);

export default router;