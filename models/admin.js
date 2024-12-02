const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  hash: { type: String },
  email: { type: String, default: "" },
  name: { type: String, default: "" },
  roles: { type: String, default: "ADMIN" },
  status: {
    type: String,
    default: "ACTIVE",
    enum: ["ACTIVE", "INACTIVE", "DELETE"],
  },
});

schema.set("toJSON", { virtuals: true }, { typePojoToMixed: false });

module.exports = mongoose.model("Admin", schema);
