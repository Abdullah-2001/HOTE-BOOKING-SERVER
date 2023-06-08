import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['guest', 'admin','owner'],
      default: 'guest'
    },
    // hotel: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Hotel',
    //   //required: true
    // },
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
      verificationToken: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default:false
    }
  }, {
    timestamps: true
  });

userSchema.methods.CreateToken = async function () {
     return await jwt.sign(
        {
            _id: this._id,
        },
        process.env.SecretKEY,
        {
            expiresIn: '1d',
        }
    );
};

userSchema.methods.ComparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        let salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

  export default mongoose.model('User', userSchema); 