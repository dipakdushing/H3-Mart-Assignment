const express     = require('express');  
const mongoose    = require('mongoose');  
const multer      = require('multer');  
const path        = require('path');  
const userModel    = require('./models/product.model');  
const excelToJson = require('convert-excel-to-json');
const bodyParser  = require('body-parser'); 
require('dotenv').config();

const storage = multer.diskStorage({  
    destination: function (req, file, cb) {
      
        cb(null, path.join(__dirname, "../my-file"));
      },
      filename: function (req, file, cb) {
        const uniquePrefix = Date.now();
        
        cb(null, uniquePrefix + "-" + file.originalname);
      }, 
});  


const uploads = multer({storage:storage}); 

//connect to db  
mongoose.connect('mongodb://localhost:27027/demo',{useNewUrlParser:true})  
.then(()=>console.log('connected to db'))  
.catch((err)=>console.log(err));


//init app  
const app = express();  


// Upload excel file and import to mongodb
app.post('/uploadfile', uploads.single("uploadfile"), (req, res) =>{

importExcelData2MongoDB(__dirname + '/uploads/' + req.file.filename);
console.log(res);
});


// Import Excel File to MongoDB database
function importExcelData2MongoDB(filePath){
// -> Read Excel File to Json Data
const excelData = excelToJson({
sourceFile: filePath,
sheets:[{
// Excel Sheet Name

name: 'Products',

// Header Row -> be skipped and will not be present at our result object.
header:{
rows: 1
},

// Mapping columns to keys
columnToKey: {
A: '_id',
B: 'Title',
C: 'Price',
}
}]
});
console.log(excelData);


// Insert Json-Object to MongoDB
userModel.insertMany(jsonObj,(err,data)=>{  
if(err){  
console.log(err);  
}else{  
res.redirect('/');  
}  
}); 
fs.unlinkSync(filePath);
}



const port = process.env.PORT || 3000;  

app.listen(port,()=>console.log('server running at port '+port));  