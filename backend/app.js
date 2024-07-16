import express from 'express';

const app = express();



app.get('/',(req,res)=>{
  res.send('hi from server');
})


const PORT  =  process.env.PORT || 8000;
const mode = process.env.NODE_ENV || 'development';

app.listen(PORT, ()=>{

  console.log(`Listening on port ${PORT} in ${mode}`)
})

