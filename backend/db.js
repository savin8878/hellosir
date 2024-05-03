// db.js
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/tripDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dataSchema = mongoose.Schema({
  EmployeeId: [String],
  EmployeeName: [String],
  Type: String,
  Department: String,
  SRNumber: Number,
  Data: [{
    Date: String,
    Day: Number,
    Country: String,
    State: String,
    City: String,
    ClientName: String,
    Purpose: String,
    Remarks: String,
  }],
});

export const Data = mongoose.model("Data", dataSchema);
