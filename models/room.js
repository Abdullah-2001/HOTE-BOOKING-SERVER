import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomNumber: {
      type: String,
      required: true,
      unique: true
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true
    },
    type: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    isBooked: {
      type: Boolean,
      default: false
    },
    
  }, {
    timestamps: true
  });
  
  export default mongoose.model('Room', roomSchema); 