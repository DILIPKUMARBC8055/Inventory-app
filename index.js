import express from "express";
import productController from "./src/controllers/products.controller.js";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import validateProduct from "./src/middlewares/validateAddProduct.middleware.js";
import validateProductValidator from "./src/middlewares/validatorProduct.middleware.js";
import { uploadFile } from "./src/middlewares/fileUpload.Middleware.js";
import UserController from "./src/controllers/Users.Controller.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { lastVisited } from "./src/middlewares/lastVisted.middleware.js";

const server = express();
const product = new productController();
const user = new UserController();


server.use(express.urlencoded({ extended: true }));
server.use(express.static("Public"));
server.use(expressEjsLayouts);
server.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
server.use(cookieParser());
server.use(lastVisited);

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.get("/", auth, product.getProducts);
server.get("/new", auth, product.getAddForm);
server.post(
  "/",
  auth,
  uploadFile.single("image"),
  validateProductValidator,
  product.addProduct
);
server.get("/update-product/:id", auth, product.updateProductView);
server.post("/update-product", auth, product.updateProduct);
server.post("/delete-product/:id", auth, product.deleteProduct);

server.get("/register", user.register);
server.post("/register", user.postRegister);
server.get("/login", user.login);
server.post("/login", user.postLogin);
server.get('/logout',user.logout);
// server.post('/logout',user.logout);

server.listen(3400);
console.log("The server is listing at 3400");
