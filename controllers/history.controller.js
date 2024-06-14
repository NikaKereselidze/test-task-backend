const { getHistoryService } = require("../services/history.service");

exports.getHistory = async (req, res, next) => {
  try {
    const history = await getHistoryService();

    return res.status(200).json({ type: "Success", history });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
