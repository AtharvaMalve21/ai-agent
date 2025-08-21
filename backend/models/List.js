const mongoose = require("mongoose");

const listItemSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
    default: "",
  },
});

const listSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    originalData: [listItemSchema],
    distributedData: [
      {
        agentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Agent",
          required: true,
        },
        agentName: String,
        items: [listItemSchema],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("List", listSchema);
