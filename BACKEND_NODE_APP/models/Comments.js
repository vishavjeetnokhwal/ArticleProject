var mongoose=require("mongoose");
var Article=require("./Article");
var User    =require("./User");


var commentSchema= new mongoose.Schema({
   		
        
   		

   	    author:{
   			id:{
   				
               type:mongoose.Schema.Types.ObjectId,
   				ref:"User"
   			},
   			name: String,
            image:String
   		},

   		
         content:String
   		

});

module.exports=mongoose.model("Comment", commentSchema);

