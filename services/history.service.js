const History = require("../database/models/History.model");
const User = require("../database/models/User.model");

exports.getHistoryService = async () => {
  try {
    const history = await History.find().sort({ createdAt: -1 });

    const histories = await Promise.all(
      history.map(async (history) => {
        const user = await User.findById(history.userId, { password: 0 });
        const historyObj = history.toObject();
        return { ...historyObj, user };
      })
    );
    return histories;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
