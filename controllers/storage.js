const { default: mongoose } = require("mongoose");
const { storageModel } = require("../models");
const uploadToPinata = require("../utils/handleUpload");

const postImage = async (req, res) => {
  const { body, file } = req;
  const fileData = {
    filename: file.filename,
    url: process.env.PUBLIC_URL + "/" + file.filename,
  };
  const data = await storageModel.create(fileData);
  res.json(data);
};

const uploadImage = async (req, res) => {
  try {
    const id = req.params.id;
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    const pinataResponse = await uploadToPinata(fileBuffer, fileName);
    const ipfsFile = pinataResponse.IpfsHash;
    const ipfs = `https://${process.env.PINATA_GATEWAY_URL}/ipfs/${ipfsFile}`;
    const data = await storageModel.create({ image: ipfs });
    res.json({ imageUrl: ipfs });
  } catch (error) {
    console.log(error);
    res.status(500).send("ERROR_UPLOAD_COMPANY_IMAGE");
  }
};

module.exports = { postImage, uploadImage };
