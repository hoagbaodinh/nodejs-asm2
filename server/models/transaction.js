const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  room: [
    {
      roomId: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        required: true,
      },
      roomNumber: [Number],
    },
  ],
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
// Phuong thuc cap nhat status
transactionSchema.methods.updateStatus = function () {
  const currentDay = new Date();
  if (this.status === "Checkout") {
    return;
  }
  if (
    new Date(this.dateStart).getTime() <= currentDay.getTime() &&
    currentDay.getTime() <= new Date(this.dateEnd).getTime()
  ) {
    this.status = "Checkin";
  }
  if (
    this.status === "Checkin" &&
    new Date(this.dateEnd).getTime() <= currentDay.getTime()
  ) {
    this.status = "Checkout";
  }
  return this.save();
};

module.exports = mongoose.model("Transaction", transactionSchema);
