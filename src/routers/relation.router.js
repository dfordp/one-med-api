import express from "express";
import {getAllRelations, getRelationTo, deleteRelation, updateRelation, createNewRelation, getRelationFrom} from '../controllers/relation.controller.js';
import {isLoggedIn, isOwner} from "../middleware/index.js"

const router = express.Router();

router.route('/getRelations').get(isLoggedIn, getAllRelations);
router.route('/getRelationfrom/:id').get(isLoggedIn, isOwner, getRelationFrom);
router.route('/getRelationto/:id').get(isLoggedIn,isOwner,getRelationTo)
router.route('/deleteRelation/:id').delete(deleteRelation);
router.route('/updateRelation/:id').patch(updateRelation);
router.route('/createRelation').post(isLoggedIn,createNewRelation);

export default router;