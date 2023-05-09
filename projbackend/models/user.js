const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = requiure("uuidv1");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlenght: 32,
      trim: true,
    },
    lastName: {
      type: String,
      maxlenght: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    userInfo: {
      type: String,
      trim: true,
    },
    //todo: comeback
    encry_password: {
      type: String,
      unique: true,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual(password)
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1;
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.method = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (plainpassword) {
    if (!password) return "";
    try {
      return createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.export = mongoose.model("User", userSchema);
