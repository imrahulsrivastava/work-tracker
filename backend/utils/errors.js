const errors = (err,req,res,next)=>{

  // development mode
   if(process.env.NODE_ENV === 'development'){
    //checking if default err object has all things

    err.message = err.message || 'Internal server Error';
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
      success:false,
      message:err.message,
      error:err,
      stack:err.stack
    })
    
   }


   // production errors
   if(process.env.NODE_ENV === 'production'){
    const error = {...err};
    error.message = err.message || 'Internal server Error';
    error.statusCode = err.statusCode  || 500;

  
    //handling duplicate key
    if(err.code === 11000){
     const message =  `${Object.keys(err.keyValue)[0]} already exists `
     error.message = message;
    }

    res.status(error.statusCode).json({
      success:false,
      message:error.message
    });

   }

}

export default errors;