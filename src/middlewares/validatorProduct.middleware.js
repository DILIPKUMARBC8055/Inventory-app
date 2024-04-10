import { body, validationResult } from "express-validator";

const validateProductValidator = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name can't be empty"),
    body("description").notEmpty().withMessage("description can't be empty"),
    body("price").isFloat({ gt: 0 }).withMessage("Enter the valid price "),
    // body("image").isURL().withMessage("Enter the valid URL"),
    body("image").custom((val,{req})=>{
      if(!req.file)
      {
        throw new Error("File not found");
      }
      return true;
    })
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
   
   
    let error=[];
    for (const i of errors.errors) {
      error.push(i.msg);
    }
   
    return res.render("new-product.ejs", { errors: error });
  }
  next();
};
export default validateProductValidator;
