import express from "express";
import {getAllRecords, getRecord, getRecordsByUserId,deleteRecord, updateRecord, createNewRecord} from '../controllers/record.controller.js';
import {isLoggedIn, isOwner, upload} from "../middleware/index.js"

const router = express.Router();

router.route('/getRecords').get(isLoggedIn, getAllRecords);
router.get('/getUserRecords/:id', isLoggedIn, isOwner,getRecordsByUserId);
router.route('/getRecord/:id').get(isLoggedIn, getRecord);
router.route('/deleteRecord/:id').delete(isLoggedIn,deleteRecord);
router.route('/updateRecord/:id').patch(isLoggedIn,updateRecord);
router.route('/createRecord').post(isLoggedIn,upload.single('attachment') ,createNewRecord);


export default router;