import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    contact: {
      email: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      website: {
        type: String
      },
    },
    price:{
        type: Number,
        required: true
    },
    stayDuration:{
        type: Date,
        required: true
    },
    checkIn:{
        type: Date,
        required: true
    },
    checkOut:{
        type: Date,
        required: true
    },
    facilities: {
      type: [String],
      required: true
    },
    detail:{
        rooms: {
            type: Number,
            required: true
          },
          beds: {
            type: String,
            required: true
          },
          beds: {
            type: Number,
            required: true
          },
          bathRoom: {
            type: Number,
            required: true
          },
    },
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    photos: {
      type: [String],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    // Additional fields like rooms, services, policies, etc.
  }, {
    timestamps: true
  });

  export default mongoose.model('Hotel', hotelSchema); 