import express from "express";
import "dotenv/config";
import connectDB from "./utils/db.js";
const app = express();
import errors from "./utils/errors.js";

//********************middlewares******************
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// *******************routes******************************
import userRoutes from './routes/userRoutes.js'

//home route
app.get("/", (req, res) => {
  res.send("server is working fine make your query at '/api/v1");
});


//custom routes
app.use('/api/v1',userRoutes);



//****************handling  errors globaly**********************
app.use(errors);


//********************establishing connection and starting serever************************
const PORT = process.env.PORT || 8000;
const mode = process.env.NODE_ENV || "development";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);  
    //server will only run if connection to mongodb successfull
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT} in ${mode}`);
    });
  } catch (error) {
    console.log("aborting server due to some error connecting to mongodb");
  }
};

start();
