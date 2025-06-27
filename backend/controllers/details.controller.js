const dynamoDB = require('../aws')
const {TABLE_NAME} = require('../models/details.model');
const {v4: uuidv4} = require('uuid');

const { ScanCommand } = require("@aws-sdk/client-dynamodb");
const { PutItemCommand, DeleteItemCommand, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

exports.getContent = async (req, res) => {
  try {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
    });
    const data = await dynamoDB.send(command);
    // Only return notes for the logged-in user
    const ownerId = req.user?.sub;
    let unmarshalledItems = data.Items.map((item) => unmarshall(item));
    if (ownerId) {
      unmarshalledItems = unmarshalledItems.filter(item => item.userId === ownerId);
    }
    res.status(200).json(unmarshalledItems);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "An error occurred while fetching items" });
  }
};



exports.addContent = async (req, res) => {
  const { title, content } = req.body;
  const ownerId = req.user?.sub; // Use optional chaining for safety

  // Validate input
  if (!title || !content || !ownerId) {
    return res.status(400).json({ error: "Missing required fields: title, content, or user authentication information." });
  }

  const timestamp = Math.floor(Date.now() / 1000);

  const params = {
    TableName: TABLE_NAME,
    Item: {
      boardId: { S: uuidv4() },
      userId: { S: ownerId },
      title: { S: title },
      content: { S: content },
      updatedAt: { N: timestamp.toString() },
    },
  };

  try {
    const command = new PutItemCommand(params);
    await dynamoDB.send(command);
    res.status(201).json({ message: 'Details added successfully', boardId: params.Item.boardId.S });
  } catch (error) {
    console.error("Error adding details:", error);
    res.status(500).json({ error: "An error occurred while adding details" });
  }
};

exports.deleteContent = async (req, res) => {
  const { boardId } = req.params;
  const ownerId = req.user?.sub; // Use optional chaining for safety

  // Validate input
  if (!boardId || !ownerId) {
    return res.status(400).json({ error: "Missing required fields: boardId or user authentication information." });
  }

  const params = {
    TableName: TABLE_NAME,
    Key: {
      boardId: { S: boardId },
      userId: { S: ownerId },
    },
  };

  try {
    const command = new DeleteItemCommand(params);
    await dynamoDB.send(command);
    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).json({ error: "An error occurred while deleting content" });
  }
};

exports.updateContent = async (req, res) => {
  const { boardId } = req.params;
  const { title, content } = req.body;
  const ownerId = req.user.sub;
  const timestamp = Math.floor(Date.now() / 1000);

  // Build dynamic UpdateExpression and ExpressionAttributeValues
  let updateExp = [];
  const expAttrValues = {
    ':updatedAt': { N: timestamp.toString() },
  };

  if (title !== undefined) {
    updateExp.push('title = :title');
    expAttrValues[':title'] = { S: title };
  }

  if (content !== undefined) {
    updateExp.push('content = :content');
    expAttrValues[':content'] = { S: content };
  }

  updateExp.push('updatedAt = :updatedAt');

  const params = {
    TableName: TABLE_NAME,
    Key: {
      boardId: { S: boardId },
      userId: { S: ownerId },
    },
    UpdateExpression: 'set ' + updateExp.join(', '),
    ExpressionAttributeValues: expAttrValues,
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    const command = new UpdateItemCommand(params);
    await dynamoDB.send(command);
    res.status(200).json({ message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'An error occurred while updating content' });
  }
};
