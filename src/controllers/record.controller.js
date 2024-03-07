import { getRecords, getRecordByUserId, createRecord, deleteRecordById, updateRecordById } from '../mongodb/models/record.js';

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
    const { user_id } = req.params;
    const record = await getRecordByUserId(user_id);

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
    const { user_id, attachment, issues, appointment, doctor_name } = req.body;

    if (!user_id || !attachment || !issues) {
      return res.status(400).json({ message: 'User ID, attachment and issues are required' });
    }

    const record = await createRecord({ user_id, attachment, issues, appointment, doctor_name });

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