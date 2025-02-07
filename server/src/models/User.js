import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "/default-profile-picture.png",
    },
    cart: {
      type: [
        {
          course: {
            type: mongoose.SchemaTypes.ObjectId,
            default: [],
            ref: "Course",
          },
        },
      ],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
