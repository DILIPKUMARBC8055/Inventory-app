const validateProduct=(req,res,next)=>{
    const product=req.body;
    let errors=[];
    if(!product.name || product.name.trim()=="")
    {
        errors.push("product name should be not null and have some char");
    }

    if(!product.description || product.description.trim()=="") errors.push("product description should be not null and have some char");
    if(!product.price || product.price<0) errors.push("price should be not and its should be positive");
    try{ const url = new URL(product.image)}
    catch(err)
    {
        errors.push("enter the valid URL");
    }
    if(errors.length>0)
    {
        return  res.render("new-product.ejs",{errors});
    }
    next();
}

export default validateProduct;