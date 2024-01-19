const mongoose = require('mongoose');
const mongourl = "mongodb+srv://vkhushboo540:Tiaragill_14@cluster0.kmoi2nf.mongodb.net/";

const connectTomongo = async () => {
    try {
        const con = mongoose.connect(mongourl);
        console.log("connected!!");
    }
    catch (err) {
        console.error("error!!!");
    };
}

module.exports = connectTomongo;