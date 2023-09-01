const mongoose=require('mongoose');
const colors=require('colors');

const mongoConn=async ()=>{
    try {
       await mongoose.connect(process.env.MONGO_URL);
       console.log("Connection to DB successfully Done".bgGreen.white); 
    } catch (error) {
        console.log(`Mongo Connection Error ${error}`.bgRed.white);
    }
}

module.exports=mongoConn;
