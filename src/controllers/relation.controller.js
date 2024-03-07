import { getRelations, getRelationByFromId, getRelationByToId, createRelation, deleteRelationById, updateRelationById } from '../mongodb/models/relation.js';

export const getAllRelations = async (req, res) => {
  try {
    const relations = await getRelations();

    return res.status(200).json(relations);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getRelationFrom = async (req, res) => {
  try {
    const { from_id } = req.params;
    const relation = await getRelationByFromId(from_id);

    if (!relation) {
      return res.status(404).json({ message: 'Relation not found' });
    }

    return res.json(relation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getRelationTo = async (req, res) => {
  try {
    const { to_id } = req.params;
    const relation = await getRelationByToId(to_id);

    if (!relation) {
      return res.status(404).json({ message: 'Relation not found' });
    }

    return res.json(relation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createNewRelation = async (req, res) => {
  try {
    const { from_id, to_id, relation } = req.body;

    if (!from_id || !to_id || !relation) {
      return res.status(400).json({ message: 'From ID, To ID and relation are required' });
    }

    const newRelation = await createRelation({ from_id, to_id, relation });

    return res.status(201).json(newRelation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteRelation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRelation = await deleteRelationById(id);

    return res.json(deletedRelation);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const updateRelation = async (req, res) => {
  try {
    const { id } = req.params;
    const { from_id, to_id, relation } = req.body;

    if (!from_id || !to_id || !relation){
      return res.sendStatus(400);
    }

    const updatedRelation = await updateRelationById(id, { from_id, to_id, relation });

    return res.status(200).json(updatedRelation).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};