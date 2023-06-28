const connectTomongo = require('./db');
const express = require('express')
var cors = require('cors');
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use(cors());
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))



app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
connectTomongo();


// const express = require("express");
// // const ejs = require("ejs");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

// mongoose.connect("mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb", {
// useNewUrlParser: true,
// useUnifiedTopology: true
// });

// const contactSchema = {
// email: String,
// query: String,
// };

// const Contact = mongoose.model("Contact", contactSchema);

// const app = express();

// app.set("view engine", "ejs");

// app.use(bodyParser.urlencoded({
// 	extended: true
// }));

// app.use(express.static(__dirname + '/public'));

// app.get("/contact", function(req, res){
// 	res.render("contact");
// });

// app.post("/contact", function (req, res) {
// 	console.log(req.body.email);
// const contact = new Contact({
// 	email: req.body.email,
// 	query: req.body.query,
// });
// contact.save(function (err) {
// 	if (err) {
// 		throw err;
// 	} else {
// 		res.render("contact");
// 	}
// });
// });

// app.listen(3000, function(){
// 	console.log("App is running on Port 3000");
// });



// // To connect with your mongoDB database
// const mongoose = require("mongoose");
// // Connecting to database
// mongoose.connect(
// "mongodb://127.0.0.1:27017/"
// ).catch((err)=>console.log("catch error"));
// const express = require("express");
// const app = express();
// const cors = require("cors");
// console.log("App listen at port 5000");
