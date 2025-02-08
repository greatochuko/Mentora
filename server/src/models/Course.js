import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    reviews: {
      type: [mongoose.SchemaTypes.ObjectId],
      default: [],
    },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    content: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        video: {
          fileName: { type: String, required: true },
          url: { type: String, required: true },
          duration: { type: Number, required: true },
        },
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;
