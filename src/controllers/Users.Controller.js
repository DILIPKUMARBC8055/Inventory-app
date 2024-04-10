import UserModel from "../models/Users.Model.js";
import ProductModel from "../models/products.Model.js";
export default class UserController {
  register(req, res) {
    res.render("register",{email:req.session.email});
  }
  postRegister(req, res) {
    UserModel.addUser(req.body);
    res.render("login",{error:null,email:req.session.email});
  }
  login(req, res) {
    res.render("login",{error:null,email:req.session.email});
  }
  postLogin(req, res) {
    const result = UserModel.ValidateUserLogin(req.body);
    if (result) {
        req.session.email=req.body.email;
        console.log(req.session.email);
        console.log(req.body.email);
        
        res.render("products", { products: ProductModel.get(),email:req.session.email });
    } else {

        res.render("login",{error:"Enter the valid credentials",email:req.session.email});
    }
  }
  logout(req,res)
  {
    req.session.destroy((err)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("login",{error:null,email:null});
        }
    })
  }
}
