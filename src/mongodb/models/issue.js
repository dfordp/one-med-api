import mongoose from "mongoose";


const issueSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
});

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;

// Issue Actions
export const getIssues = () => Issue.find();
export const getIssueByName = (name) => Issue.findOne({ name });
export const getIssueById = (id) => Issue.findById(id);
export const createIssue = (values) => {
  console.log('Creating issue with values:', values);
  return new Issue(values).save()
    .then((issue) => issue.toObject())
    .catch((error) => {
      console.error('Error creating issue:', error);
      throw error;
    });
};
export const deleteIssueById = (id) => Issue.findOneAndDelete({ _id: id });
export const updateIssueById = (id, values) => Issue.findByIdAndUpdate(id, values);