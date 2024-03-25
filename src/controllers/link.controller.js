import { getLinks, getLinkByUserId, createLink, deleteLinkById, updateLinkById, getLinkById } from '../mongodb/models/link.js';

export const getAllLinks = async (req, res) => {
  try {
    const links = await getLinks();

    return res.status(200).json(links);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getLinkDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await getLinkById(id);

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    return res.json(link);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};



export const getLink = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await getLinkByUserId(id);

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    return res.json(link);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createNewLink = async (req, res) => {
  try {
    const { user_id, linkName, relatedIssue } = req.body;

    if (!user_id ||!linkName || !relatedIssue) {
      return res.status(400).json({ message: 'User ID and issues are required' });
    }

    const link = await createLink({ user_id, name : linkName, relatedIssue });

    return res.status(201).json(link);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteLink = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLink = await deleteLinkById(id);

    return res.json(deletedLink);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, issues } = req.body;

    if (!user_id || !issues){
      return res.sendStatus(400);
    }

    const updatedLink = await updateLinkById(id, { user_id, issues });

    return res.status(200).json(updatedLink).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};