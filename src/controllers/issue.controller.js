import { deleteIssueById, getIssues, getIssueByName, getIssueById } from '../mongodb/models/issue.js';

export const getAllIssues = async (req, res) => {
  try {
    const issues = await getIssues();

    return res.status(200).json(issues);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await getIssueById(id);

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    return res.json(issue);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createIssue = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const existingIssue = await getIssueByName(name);

    if (existingIssue) {
      return res.status(400).json({ message: 'Issue already exists' });
    }

    const issue = await createIssue({ name });

    return res.status(201).json(issue);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedIssue = await deleteIssueById(id);

    return res.json(deletedIssue);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const updateIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title){
      return res.sendStatus(400);
    }

    const issue = await Issue.findById(id);

    if (!issue) {
      return res.sendStatus(404);
    }

    if (title) {
      issue.title = title;
    }

    await issue.save();

    return res.status(200).json(issue).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};