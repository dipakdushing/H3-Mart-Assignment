var mongoose  =  require('mongoose');  
   
var demoSchema = new mongoose.Schema({

    title:{  
        type:String  , required:true
    },      
    price:{  
        type:Number , required:true  
    }
    
});  
   
module.exports = mongoose.model('userModel',demoSchema); 