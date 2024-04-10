import path from "path";
import ProductModel from "../models/products.Model.js";
import { uploadFile } from "../middlewares/fileUpload.Middleware.js";
import { copyFileSync } from "fs";
export default class productController {
  getProducts(req, res) {
    // console.log(ProductModel.get());
    res.render("products", {
      products: ProductModel.get(),
      email: req.session.email,
    });
  }

  getAddForm(req, res) {
    res.render("new-product.ejs", {
      errors: null,
      email: req.session.email,
    });
  }
  addProduct(req, res) {
    const imageURL = "/src/Public/Images/" + req.file.filename;
    console.log(imageURL);
    ProductModel.add(req.body, imageURL);
    res.render("products", {
      products: ProductModel.get(),
      email: req.session.email,
    });
  }
  updateProductView(req, res) {
    res.render("update-product", {
      products: ProductModel.getProduct(req.params.id),
      errors: null,
      email: req.session.email,
    });
  }
  updateProduct(req, res) {
    ProductModel.update(req.body);
    res.render("products", {
      products: ProductModel.get(),
      email: req.session.email,
    });
  }
  deleteProduct(req, res) {
    ProductModel.delete(req.params.id);
    res.render("products", {
      products: ProductModel.get(),
      email: req.session.email,
    });
  }
}
