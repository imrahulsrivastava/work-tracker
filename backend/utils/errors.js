const errors = (err,req,res,next)=>{

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

   if(process.env.NODE_ENV === 'production'){

    const error = {...err};
    error.message = err.message || 'Internal server Error';
    error.statusCode = err.statusCode  || 500;
    res.status(error.statusCode).json({
      success:false,
      message:error.message
    });

   }


}

export default errors;