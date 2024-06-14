const History = require("../models/History.model");
const User = require("../models/User.model");

exports.getHistoryService = async () => {
  try {
    const history = await History.find().sort({ createdAt: -1 });

    let user;
    for (let i = 0; i < history.length; i++) {
      user = await User.findById(history[i].userId, { password: 0 });
      history[i]._doc.user = user;
    }
    return history;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
