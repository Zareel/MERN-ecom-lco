## schema

- install mongoose
- term => salt (cryptography)

## create userSchema

- models/user.js

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    unique: true,
    required: true,
    trim: true,
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
});

module.export = mongoose.model("User", userSchema);
```

## Your first virtual

- in mongoose a `virtual` is a property that is not stored in the mongoDB. These are computed from the existing information that are already provided by the user.
- eg: suppose you have two string properties `firstname` and the `lastname`. You can created a virtual property `fullname` that lets you set both of these properties at once
  [mongooseVirtual](https://mongoosejs.com/docs/tutorials/virtuals.html)

## What is uuid

- install => npm i uuid
- [uuid](https://www.npmjs.com/package/uuid)

## Crypto

- [crypto](https://nodejs.org/docs/latest-v19.x/api/crypto.html)

## create schema methods

- models/user.js

```js
userSchema.method = {
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
```

## create virtual fields

- we have renamed our password field to `encry_password` that is what we are storing in our database.
- models/user.js

```js
  encry_password: {
    type: String,
    unique: true,
    required: true,
  },
```

- we need to create another field through the virtual which can be simply called as the `password`. But actually what is going to be stored in the database is `ecry_password`
- to create setter, we expect somebody give a password, because while setting it up we want use the method `securePassword` which basically require us to pass on the plain password in the `set(function(password))`

```js
userSchema.virtual(password)
  .set(function(password))
  .get()

```

- next is to keep the password the we get from the user be stored in a variable so `this.password is going to be 'password'`
- the convention of using a private variable is `_`

```js
this._password = password;
// password is now stored securely in another variable to deffer it later on
```

- to populate the salt field which we already have declared

```js
this.salt = uuidv1();
```

- we need to set one more field `the encry_password`

```js
this.encry_password = this.securePassword(password);
```

- now what if somebody wants to take the things back?
  let create getter

```js
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
```

## creating new method `authenticate`

- creating a method to authentiacte the user
- create a function that takes the password form the user
- retur true if it's matching and return false if its not matching
- now we have two methods in our `user.Schema` ie authenticate and secure password

```js
 authenticate: function(plainpassword){
    return this.securePassword(plainpassword) === this.encry_password
  },
```

## create category schema

```js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      unique: true,
    },
  },
  { timestamps: true }
); // it will makd sure that whenever i am making a new entry with this schema, it records the created time and store it in the database

module.exports = mongoose.model("Category", categorySchema);
```

## create productSchema

```js
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema; //pull out ObjectId from mongoose.Schema to link productSchema to categorySchema

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 32,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxLength: 1000,
    },
    price: {
      tipe: Number,
      trim: true,
      required: true,
      maxLength: 32,
    },
    // every single products belong to some category. inorder to link produects to category
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photos: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
```

## create ordreSchema

```js
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductsInTheCartSchema = mongoose.Schema(
  {
    // this schema is based on the previously created productSchema
    product: {
      type: ObjectId,
      ref: "Product",
    },
    // what you really want to see in the cart 👇
    name: String,
    count: Number,
    price: Number,
  },
  { timestapms: true }
);

const productsInTheCart = mongoose.model(
  "ProductsInTheCart",
  ProductsInTheCartSchema
);

const orderSchema = new mongoose.Schema(
  {
    // below array is of the products in the cart
    products: [ProductsInTheCartSchema],
    transaction_id: {},
    amount: {
      type: Number,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    updated: Date, // updated by the admin.
    user: {
      type: ObjectId,
      ref: User,
    },
  },
  { timestapms: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, productsInTheCart };
```

# Database connectivity

## 01Mongodb connection and other db talk

```js
mongoose
  .connect("mongodb://127.0.0.1:27017/tshirt", {
    useNewUrlParser: true,
    useUnifiedTopology: true, // help us to keep our database connection alive
    useCreateIndex: true,
  })
  .then(() => {
    console.log("db connected");
  });
```

# Middleware and initial routes

## 01What is a middleware?

- Middleware is something that comes in between
- once the request comes fist need to check whether is logged in then check the role of the user
- these checking is actually done by middlewares
- and finally you want to pass on a response

- [body-parser](https://www.npmjs.com/package/body-parser)
- it handles the values that are taken from the frontend

-[cookie-parser](https://www.npmjs.com/package/cookie-parser)

- to take something from the cookie or to set something to the cookie

- [cors](https://www.npmjs.com/package/cors)
- Cross Origin Resource sharing
- cors is a nodejs package for providing a Connect/experess middleware that can be used to enable cors with various options

- `app.js`

```js
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
```

## Router in express

- `authController.js`

```js
export const signout = (req, res) => {
  res.json({
    message: "user has signed out",
  });
};
```

- `authRoutes`

```js
import express from "express";
import { signout } from "../controllers/authController.js";

const router = express.Router();

router.get("/signout", signout);

export default router;
```

## Studio T3 (Robo Mongo)

- is an amazing GUI and IDE client for mongodb that help us in speed up tasks like query building, data exploration, import/ export code generation. Studio T3 Free allows managing mongodb data by inputing new as well as viewing, querying and computing the existing data items

## Creating route for usr signup

Writ user schema from live code sessiong

## Bearer

- Bearer is something that carries the token

## How to protect a router

- Putting restriction on the route
- isLoggedIn, isAuthenticated, isAdmin

- `authMiddleware.js`

```js
import User from "../models/userSchema.js";
import JWT from "jsonwebtoken";
import config from "../config/index.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    let token;
    if (
      req.cookies.token ||
      (req.header.authorization &&
        req.header.authorization.startsWith("Bearer"))
    ) {
      token = req.cookies.token || req.header.authorization.split(" ")[1];
      //token = "Bearer ijioj[poijwpdsjijrio"
    }
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Not autherized to this resource",
      });
    }
    const decodedJWTpayload = JWT.verify(token, config.JWT_SECRET);
    req.user = await User.findById(decodedJWTpayload._id, "name email, role");
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  console.log("isAdmin is running");
  next();
};
```

## testroute

-`authControllers.js `

```js
router.get("/testroute", isLoggedIn, (req, res) => {
  res.send("A protected route");
});
```
