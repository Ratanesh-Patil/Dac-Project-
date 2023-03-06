const uservalidation=(values)=>{
    let errors={}
    if(!values.name){
        errors.name="Name is required"
    }
    if(!values.city){
        errors.city="City is required"
    }
    if(!values.userid){
        errors.userid="User id is required"
    }
    if(!values.phone){
        errors.phone="Phone no is required"
    }
    if(!values.pwd){
        errors.pwd="Password is required"
    }
    if(!values.cpwd){
        errors.cpwd="Confirm password is required"
    }
    
    if(values.pwd && values.cpwd && values.pwd!==values.cpwd){
        errors.cpwd="Password not match"
    }

    return errors;
}

export default uservalidation;