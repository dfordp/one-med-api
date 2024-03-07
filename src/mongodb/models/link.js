import mongoose from "mongoose";   


const linkSchema = new mongoose.Schema({
    user_id : { type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    issues : [{ type: mongoose.Schema.Types.ObjectId,ref: 'Issue'}],
});

const Link = mongoose.model("Link",linkSchema);

export default Link;

// Link Actions
export const getLinks = () => Link.find();
export const getLinkByUserId = (user_id) => Link.find({ user_id });
export const createLink = (values) => {
  console.log('Creating link with values:', values);
  return new Link(values).save()
    .then((link) => link.toObject())
    .catch((error) => {
      console.error('Error creating link:', error);
      throw error;
    });
};
export const deleteLinkById = (id) => Link.findOneAndDelete({ _id: id });
export const updateLinkById = (id, values) => Link.findByIdAndUpdate(id, values);