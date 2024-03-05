import mongoose from "mongoose";


const recordSchema = new mongoose.Schema({
    user_id : { type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    attachment : {type : String , required : true },
    issues : [{ type: mongoose.Schema.Types.ObjectId,ref: 'Issue'}],
    appointment : {type : Date , required: false},
    doctor_name : {type : String , required : false},
});


const Record = mongoose.model("Record",recordSchema);

export default Record;

// Record Actions
export const getRecords = () => Record.find();
export const getRecordByUserId = (user_id) => Record.find({ user_id });
export const createRecord = (values) => {
  console.log('Creating record with values:', values);
  return new Record(values).save()
    .then((record) => record.toObject())
    .catch((error) => {
      console.error('Error creating record:', error);
      throw error;
    });
};
export const deleteRecordById = (id) => Record.findOneAndDelete({ _id: id });
export const updateRecordById = (id, values) => Record.findByIdAndUpdate(id, values);