import captureAsyncError from '../utils/captureAsyncError.js'
import usersModel from '../models/user.js'


// register a user => /api/v1/register
const register = captureAsyncError (async(req,res,next)=>{
  const user = await usersModel.create(req.body);

  res.status(201).json({
    success:true,
    data:user,
  })
})

export {
  register
}