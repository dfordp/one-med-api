import express from "express";
import {getAllLinks, getLink, deleteLink, updateLink, createNewLink, getLinkDetails} from '../controllers/link.controller.js';
import {isLoggedIn, isOwner} from "../middleware/index.js"

const router = express.Router();

router.route('/getLinks').get(isLoggedIn, getAllLinks);
router.route('/getLink/:id').get(isLoggedIn, getLink);
router.route('/getLinkDetails/:id').get(isLoggedIn, getLinkDetails);
router.route('/deleteLink/:id').delete(deleteLink);
router.route('/updateLink/:id').patch(updateLink);
router.route('/createLink').post(isLoggedIn,createNewLink);

export default router;