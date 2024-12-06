// schema
export const uservalidation = {
    name: {
        notEmpty: {
            errorMessage : "cannot enter empty values",
        },
        isLength :{
            Option: {
                min: 2,
                max: 10,
            },
            errorMessage: "length must be keep 2 between 10",  
        },
        isString: true,
    },
    //we can enter filed by filed validation login here 
};