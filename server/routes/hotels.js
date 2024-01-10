const express = require("express");

const router = express.Router();

const hotelController = require("../controllers/hotel");

router.get("/prop-by-city", hotelController.getPropertiesByCity);
router.get("/prop-by-type", hotelController.getPropsTypes);
router.get("/prop-by-rate", hotelController.getHighRatingHotel);
router.get("/get-hotels", hotelController.getSearchHotels);
router.get("/all-hotels", hotelController.getHotels);
router.get("/get-hotel/:id", hotelController.getHotel);
router.get("/room/:id", hotelController.getHotelRooms);
router.post("/add-hotel", hotelController.addHotel);
router.delete("/:id", hotelController.deleteHotel);
router.put("/update-hotel/:id", hotelController.updateHotel);

module.exports = router;
