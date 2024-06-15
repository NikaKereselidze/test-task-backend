const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    email: String,
    authorId: Schema.Types.ObjectId,
    expiresAt: Date,
    name: String,
    status: String,
    jobIds: Array,
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model("Product", productSchema);
