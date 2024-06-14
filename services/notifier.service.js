const History = require("../models/History.model");
const Product = require("../models/Product.model");
const { agenda, expire } = require("../utils/agendajobs");
const mongoose = require("mongoose");

exports.addProductService = async (email, expiresAt, name, authorId) => {
  try {
    const product = await Product.create({
      email,
      expiresAt,
      name,
      authorId,
    });

    await History.create({
      userId: authorId,
      action: "add-product",
      productId: product._id,
    });

    await expire(email, name, expiresAt, product._id);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.deleteProductService = async (productId, userId) => {
  try {
    const product = await Product.findByIdAndDelete(productId);

    if (product) {
      const jobs = await agenda.jobs({
        "data.productId":
          mongoose.Types.ObjectId.createFromHexString(productId),
      });

      for (let i = 0; i < jobs.length; i++) {
        jobs[i].remove();
      }
      await History.create({
        userId,
        action: "delete-product",
        productId: product._id,
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
