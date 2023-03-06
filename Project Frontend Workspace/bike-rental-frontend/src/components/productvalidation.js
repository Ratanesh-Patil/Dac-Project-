const productvalidation=(values)=>{
    let errors={}
    if(!values.bname){
        errors.pname="Product Name is required"
    }
    if(!values.price){
        errors.price="Price is required"
    } 
    if(!values.cat){
        errors.cat="Category is required"
    } 
    if(!values.author){
        errors.author="Author is required"
    }   
    return errors;
}

export default productvalidation;