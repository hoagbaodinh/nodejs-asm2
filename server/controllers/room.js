const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/Transaction.js");

// Get tat ca phong
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    console.log(err);
  }
};

// Cap nhat trang thaai phong
exports.updateRoomAvailability = async (req, res) => {
  try {
    // Tim Room theo Id
    const room = await Room.findById(req.params.id);
    // Update date
    room.unavailableDates.push({
      date: req.body.dates,
      roomNumber: req.body.roomNumber,
    });
    // Luu Room sau khi update
    await room.save();
    res.status(200).json("Room status updated");
  } catch (err) {
    console.log(err);
  }
};
//Get Room By Id
exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    console.log(err);
  }
};

// Create Room
exports.addRoom = async (req, res) => {
  const room = new Room(req.body);
  const hotelId = req.params.hotelId;
  try {
    await room.save();
    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { rooms: room._id.toString() },
    });
    res.status(200).json("Created Room");
  } catch (err) {
    console.log(err);
  }
};

// Update Room
exports.updateRoom = async (req, res) => {
  try {
    await Room.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.status(200).json("Room has been updated");
  } catch (err) {
    console.log(err);
  }
};

// Delete room
exports.deleteRoom = async (req, res) => {
  const roomId = req.params.id;
  try {
    // Tim transaction co roomId
    const transaction = await Transaction.findOne({
      "room.roomId": roomId,
    });
    // Neu ton tai transaction thi thong bao cho nguoi dung
    if (transaction) {
      return res.status(400).json("Room is already booked! Cannot delete");
    }
    await Room.findOneAndDelete({ _id: roomId });
    res.status(200).json("Room has been deleted");
  } catch (err) {
    console.log(err);
  }
};
