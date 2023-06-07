const mongoose = require("mongoose");
const schema = mongoose.Schema;

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Arunkumar:1234@cluster0.fs56jvc.mongodb.net/data",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
        ssl: true
      }
    );
    console.log("DB Connected");
  } catch (e) {
    console.log(e.message, "error in connecting db");
  }
};

const studentSchema = schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    required: true,
  },
  mentorAssigned: {
    type: schema.Types.ObjectId,
    default: null,
    ref: "mentors",
  },
});

const student = mongoose.model("students", studentSchema, "students");

const mentorSchema = schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  studentsAssigned: [
    {
      type: schema.Types.ObjectId,
      ref: "students",
      default: null,
    },
  ],
});

const mentor = mongoose.model("mentors", mentorSchema, "mentors");

module.exports = { dbConnect, student, mentor };
