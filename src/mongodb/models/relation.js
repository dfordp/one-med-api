import mongoose from "mongoose";

const relationSchema = new mongoose.Schema({
    from_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    relation : {
        type : String,
        required : true,
    }
});


const Relation = mongoose.model("Relation",relationSchema);

export default Relation;

// Relation Actions
export const getRelations = () => Relation.find();
export const getRelationByFromId = (from_id) => Relation.find({ from_id });
export const getRelationByToId = (to_id) => Relation.find({ to_id });
export const createRelation = (values) => {
  console.log('Creating relation with values:', values);
  return new Relation(values).save()
    .then((relation) => relation.toObject())
    .catch((error) => {
      console.error('Error creating relation:', error);
      throw error;
    });
};
export const deleteRelationById = (id) => Relation.findOneAndDelete({ _id: id });
export const updateRelationById = (id, values) => Relation.findByIdAndUpdate(id, values);