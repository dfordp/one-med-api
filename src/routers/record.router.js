import express from "express";
import {getAllRecords, getRecord, deleteRecord, updateRecord} from '../controllers/record.controller.js';
import {isLoggedIn, isOwner} from "../middleware/index.js"

const router = express.Router();

router.route('/getRecords').get(isLoggedIn, getAllRecords);
router.route('/getRecord/:id').get(isLoggedIn, isOwner, getRecord);
router.route('/deleteRecord/:id').delete(deleteRecord);
router.route('/updateRecord/:id').patch(updateRecord);

export default router;