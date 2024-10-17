const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  hash: { type: String },
  email: { type: String },
  locked: { type: Boolean, default: false },
  coin:{ type: Number,  default:0 },
  money:{ type: Number, default:0 },
  exp:{ type: Number, default:0 },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  lastIP: { type: String, default: "::1"  },
});

schema.set("toJSON", { virtuals: true }, { typePojoToMixed: false });

module.exports = mongoose.model("User", schema);
