import express from "express";
import "dotenv/config";
import connectDB from "./utils/db.js";
const app = express();
import errors from "./utils/errors.js";

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));




//base route
import userRoutes from './routes/userRoutes.js'

//home route
app.get("/", (req, res) => {
  res.send("server is working fine make your query at '/api/v1");
});


//custom router
app.use('/api/v1',userRoutes);



//handling all errors
app.use(errors);


//establishing connection

const PORT = process.env.PORT || 8000;
const mode = process.env.NODE_ENV || "development";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT} in ${mode}`);
    });
  } catch (error) {
    console.log("aborting server due to some error in connecting mongodb");
  }
};

start();
