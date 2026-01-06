import mongoose from "mongoose"

const connectDB = async() => {
   try {
     const dbInstance = mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
     console.log("Datebase Connected:",(await dbInstance).connection.host);
     
   } catch (error) {
    console.log("Databse Connection Failed:",error);
    process.exit(1)
   }
}
export default connectDB