const Product = require("../models/Product.model");
const {
  addProductService,
  deleteProductService,
} = require("../services/notifier.service");

exports.listProducts = async (req, res, next) => {
  const products = await Product.find({}, { jobIds: 0 }).sort({
    createdAt: -1,
  });

  return res.status(200).json({ type: "Success", products });
};

exports.addProduct = async (req, res, next) => {
  const { email, expiresAt, name } = req.body;
  const { userId: authorId } = req;
  try {
    await addProductService(email, expiresAt, name, authorId);

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { productId } = req.query;
  const { userId } = req;
  try {
    await deleteProductService(productId, userId);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
