const Hotel = require("../models/hotel.js");
const Transaction = require("../models/Transaction.js");

// Tim số lượng properties theo tên thành phố
exports.getPropertiesByCity = async (req, res) => {
  try {
    const hotels = await Hotel.find();

    // Tim hotel theo ten thanh pho
    const hanoiProp = hotels.filter((h) => h.city === "Ha Noi");
    const hcmProp = hotels.filter((h) => h.city === "Ho Chi Minh");
    const dnProp = hotels.filter((h) => h.city === "Da Nang");
    const properties = {
      Hanoi: hanoiProp.length,
      Hcm: hcmProp.length,
      Danang: dnProp.length,
    };
    res.status(200).json(properties);
  } catch (err) {
    console.log(err);
  }
};

// Tim số lượng properties theo tên loại
exports.getPropsTypes = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    const hotel = hotels.filter((h) => h.type === "hotel");
    const apartment = hotels.filter((h) => h.type === "apartment");
    const villa = hotels.filter((h) => h.type === "villa");
    const resort = hotels.filter((h) => h.type === "resort");
    const cabin = hotels.filter((h) => h.type === "cabin");

    const types = {
      hotel: hotel.length,
      apartment: apartment.length,
      villa: villa.length,
      resort: resort.length,
      cabin: cabin.length,
    };

    res.status(200).json(types);
  } catch (error) {
    console.log(error);
  }
};

// Get 3 hotel có rating cao nhất
exports.getHighRatingHotel = async (req, res) => {
  try {
    const hotels = await Hotel.find();

    const hotelSortedByRating = hotels
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    res.status(200).json(hotelSortedByRating);
  } catch (error) {
    console.log(error);
  }
};
// Get tát cac hotels
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    console.log(error);
  }
};

// Get các hotels theo điều kiện
exports.getSearchHotels = async (req, res) => {
  const { min, max, city, dates, rooms } = req.query;
  const date = JSON.parse(dates);

  try {
    let hotels;
    if (city) {
      hotels = await Hotel.find({
        city: city,
        cheapestPrice: { $gt: min || 0, $lt: max || 999 },
      }).populate("rooms");
    } else {
      hotels = await Hotel.find({
        cheapestPrice: { $gt: min || 0, $lt: max || 999 },
      }).populate("rooms");
    }
    // Hàm chuyển khoảng thời gian từ Date sang [miliseconds]
    const getDateRange = (start, end) => {
      const date = new Date(start);
      const endDate = new Date(end);

      let dates = [];

      while (date <= endDate) {
        dates.push(new Date(date).getTime());
        date.setDate(date.getDate() + 1);
      }
      return dates;
    };

    const allDates = getDateRange(date[0].startDate, date[0].endDate);
    // Hàm kiểm tra roomNumber còn trông vào ngày đặt
    const isAvailable = (room, roomNum) => {
      let isAvailable = true;
      const roomN = room.unavailableDates.find((r) => r.roomNumber === roomNum);
      if (roomN?.date.some((d) => allDates.includes(new Date(d).getTime()))) {
        isAvailable = false;
      }

      return isAvailable;
    };
    // Lọc Hotel
    const results = hotels.filter((hotel) => {
      // Lọc Room

      const avaiRoom = hotel.rooms.map((room) => {
        // Kiểm tra các roomNumber đã bị đặt hay chưa
        const avaiRoomNum = room.roomNumbers.filter((roomNum) =>
          isAvailable(room, roomNum)
        );
        return avaiRoomNum;
      });
      // Kiểm tra các phòng còn lại có đủ với số phòng đặt

      if (avaiRoom.flat(1).length < rooms) return false;
      else return true;
    });
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
  }
};

// Lấy thông tin hotel theo Id
exports.getHotel = async (req, res) => {
  const hotelId = req.params.id;

  try {
    const hotel = await Hotel.findById(hotelId);
    res.status(200).json(hotel);
  } catch (error) {
    console.log(error);
  }
};

exports.getHotelRooms = async (req, res) => {
  const hotelId = req.params.id;

  try {
    const hotels = await Hotel.findById(hotelId).populate("rooms");

    res.status(200).json(hotels.rooms);
  } catch (error) {
    console.log(error);
  }
};

// Create new hotel

exports.addHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    await newHotel.save();
    res.status(200).json("Created Hotel");
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update hotel

exports.updateHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.status(200).json("Hotel has been updated!");
  } catch (error) {
    console.log(error);
  }
};

// Delete hotel

exports.deleteHotel = async (req, res) => {
  const hotelId = req.params.id;
  try {
    const transaction = await Transaction.findOne({
      hotel: hotelId,
    });
    // Kiem tra hotel da duoc dat hay chua
    if (transaction) {
      return res.status(400).json("Hotel is already booked! Cannot delete");
    } else {
      await Hotel.findOneAndDelete({ _id: hotelId });
      res.status(200).json("Hotel has been deleted");
    }
  } catch (error) {
    console.log(error);
  }
};
