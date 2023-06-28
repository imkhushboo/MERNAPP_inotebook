const mongoose=require('mongoose');
const mongourl="mongodb://127.0.0.1:27017/inotebook";

const connectTomongo=async()=>{
    try{
        const con=mongoose.connect(mongourl);
            console.log("connected!!");
    }
    catch(err){
        console.error("error!!!");
    };
}

module.exports=connectTomongo;