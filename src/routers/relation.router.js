import express from "express";
import {getAllRelations, getRelationTo, deleteRelation, updateRelation} from '../controllers/relation.controller.js';
import {isLoggedIn, isOwner} from "../middleware/index.js"

const router = express.Router();

router.route('/getRelations').get(isLoggedIn, getAllRelations);
router.route('/getRelation/:id').get(isLoggedIn, isOwner, getRelationTo);
router.route('/deleteRelation/:id').delete(deleteRelation);
router.route('/updateRelation/:id').patch(updateRelation);

export default router;