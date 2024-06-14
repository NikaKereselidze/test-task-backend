const mongoose = require("mongoose");
const { Schema } = mongoose;

const historySchema = new Schema(
  {
    userId: Schema.Types.ObjectId,
    action: String,
    productId: Schema.Types.ObjectId,
  },
  { timestamps: true }
);

module.exports = History = mongoose.model("History", historySchema);
