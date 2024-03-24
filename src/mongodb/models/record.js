import mongoose from "mongoose";


const recordSchema = new mongoose.Schema({
    user_id : { type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    name : {type:String,required:true},
    attachment : {type : String , required : true },
    issue : {type : String , required : true},
    appointment : {type : Date , required: true},
    doctor_name : {type : String , required : false},
}, {timestamps:true});


const Record = mongoose.model("Record",recordSchema);

export default Record;

// Record Actions
export const getRecords = () => Record.find();
export const getRecordById = (_id) => Record.findById(_id);
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