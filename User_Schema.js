import * as  Yup from 'yup'
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export  const userSchema=Yup.object({
    firstname: Yup.string().min(2).max(25).required("firnst canot be Empty"),
    lastname:  Yup.string().min(2).max(25).required("Lastname canot be Empty"),
    email: Yup.string().email().required("please Enter you Email"),
    addressed: Yup.string().min(2).max(50).required("Addressed canot be Empty"),
    phone: Yup.string()
    .required("required")
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "phone should contain 10 digit")
    .max(10, "phone should contain 10 digit"),
     language:Yup.array().min(1, "please Select your language"), 
    gender: Yup.string().required("please select your gender"),
    state: Yup.string().required("please select your State"),
    
})