import { getRecords, getRecordById, createRecord, deleteRecordById, updateRecordById } from '../mongodb/models/record.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const getAllRecords = async (req, res) => {
  try {
    const records = await getRecords();

    return res.status(200).json(records);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getRecord = async (req, res) => {
  try {
    const { _id  } = req.params;
    const record = await getRecordById(_id);

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    return res.json(record);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createNewRecord = async (req, res) => {
  try {
    const { user_id, recordName, attachments, issues, appointment, doctor_name } = req.body;
    const {path} = req.file;

    if (!user_id || !issues || !recordName) {
      return res.status(400).json({ message: 'User ID, attachment and issues are required' });
    }

    const imageURL = await uploadOnCloudinary(path);
    const image = imageURL.secure_url;


    const record = await createRecord({ user_id, attachment:image, issues, appointment, doctor_name });

    return res.status(201).json(record);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecord = await deleteRecordById(id);

    return res.json(deletedRecord);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, attachment, issues, appointment, doctor_name } = req.body;

    if (!user_id || !attachment || !issues){
      return res.sendStatus(400);
    }

    const updatedRecord = await updateRecordById(id, { user_id, attachment, issues, appointment, doctor_name });

    return res.status(200).json(updatedRecord).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};