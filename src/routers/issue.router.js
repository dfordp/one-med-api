import express from "express";
import {getAllIssues, getIssue, deleteIssue, updateIssue} from '../controllers/issue.controller.js';
import {isLoggedIn, isOwner} from "../middleware/index.js"

const router = express.Router();

router.route('/getIssues').get(isLoggedIn, getAllIssues);
router.route('/getIssue/:id').get(isLoggedIn, isOwner, getIssue);
router.route('/deleteIssue/:id').delete(deleteIssue);
router.route('/updateIssue/:id').patch(updateIssue);

export default router;