const express = require("express");

const router = express.Router();

const transactionController = require("../controllers/transaction");

router.post("/add-transaction", transactionController.addTransaction);
router.get("/user-transaction/:id", transactionController.getTransactionByUser);
router.get("/all-transactions", transactionController.getTransactions);
router.get("/num-of-transactions", transactionController.getNumOfTrans);
router.get("/total-earning", transactionController.getTotalEarning);
router.put("/update-transaction/:id", transactionController.updateTransaction);

module.exports = router;
