const express = require("express");

const router = express.Router();

const roomController = require("../controllers/room");

router.put("/availability/:id", roomController.updateRoomAvailability);
router.get("/all-rooms", roomController.getRooms);
router.post("/add-room/:hotelId", roomController.addRoom);
router.delete("/:id", roomController.deleteRoom);
router.get("/get-room/:id", roomController.getRoom);
router.put("/update-room/:id", roomController.updateRoom);

module.exports = router;
