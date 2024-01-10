const Transaction = require("../models/Transaction");

// Create Transaction
exports.addTransaction = async (req, res) => {
  const room = req.body.room.map((r) => {
    return {
      roomId: r.split(",")[1],
      roomNumber: r.split(",")[0],
    };
  });
  const transaction = new Transaction({
    user: req.body.user,
    hotel: req.body.hotelId,
    room: room,
    dateStart: req.body.startDate,
    dateEnd: req.body.endDate,
    price: req.body.price,
    payment: req.body.paymentMethod,
    status: "Booked",
  });
  try {
    const savedTransaction = await transaction.save();
    res.status(200).json(savedTransaction);
  } catch (err) {
    console.log(err);
  }
};
// Read Transaction

// Get Transaction by UserId
exports.getTransactionByUser = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.params.id,
    }).populate("hotel user");
    // Cap nhat status
    const updateTrans = transactions.map((t) => {
      t.updateStatus();
      return t;
    });

    res.status(200).json(updateTrans);
  } catch (err) {
    console.log(err);
  }
};
// Get All Transactions
exports.getTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.find().populate("hotel user");

    if (!transaction) {
      return res.status(404).json("No transaction found");
    } else {
      // Cap nhat status
      const updatedTrans = transaction.map((t) => {
        t.updateStatus();
        return t;
      });
      return res.status(200).json(updatedTrans);
    }
  } catch (err) {
    console.log(err);
  }
};
// Update Transaction

exports.updateTransaction = async (req, res, next) => {
  try {
    await Transaction.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.status(200).json("Transaction updated successfully");
  } catch (err) {
    console.log(err);
  }
};

// Delete Transaction

exports.deleteTransaction = async (req, res, next) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(200).json("Transaction deleted successfully");
  } catch (err) {
    console.log(err);
  }
};
// Lay tong cac giao dich duoc thuc hien
exports.getNumOfTrans = async (req, res) => {
  try {
    const transaction = await Transaction.find();
    res.status(200).json(transaction.length);
  } catch (err) {
    console.log(err);
  }
};

// Lay tong tien cua tat cac cac giao dich
exports.getTotalEarning = async (req, res) => {
  try {
    const transaction = await Transaction.find();
    const totalEarning = transaction.reduce((acc, cur) => acc + cur.price, 0);
    res.status(200).json(totalEarning);
  } catch (err) {
    console.log(err);
  }
};
