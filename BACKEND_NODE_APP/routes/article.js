var express      =require("express"),
    router       =express.Router(),
    Article 		 =require("../models/Article"),
    middleware   =require("./middlewares"),
    validator   =require('validator');







//==================
// ALL ARTICLES	 
//==================


router.get("/articles", function(req,res){
   
   Article.find({}).populate("comments").exec(function(err,article){
    

    if(err)
    {
    	console.log("========================================");
			console.log("Error in All Articles");
           console.log("========================================");
    	console.log(err);
   return res.json({success:false,msg:"Somthing went wrong !"}); 

    }
	else
	{
    return res.json(article);
    }

   }

   );
	
});





//========================
//SINGLE ARTICLE
//========================

router.get("/articles/:id", middleware.auth,middleware.checkpayment,function(req,res){

Article.findById(req.params.id).populate("comments").exec(function(err,foundArticle)
	{
		if(err)
		{
   
           console.log("========================================");
			     console.log("Error in Single Article");
           console.log("========================================");
            
			console.log(err);
      return res.json({success:false,msg:"Somthing went wrong !"}); 

		}
		else
		{


			return res.json({success:true,article:foundArticle});
		}
	});




});





//===============================
// NEW ARTICLE CREATION
//==============================

router.post("/articles", middleware.auth,middleware.isActivated, function(req,res){

//=====================================VALIDATIONS ==========================================

   if((req.body.title&&req.body.image&&req.body.desc)==undefined)
   return res.json({success:false,msg:"Please provide valid inputs !"});

    if(!validator.isURL(req.body.image,{protocols:['http','https']}))
   return  res.json({success:false,msg:"Image must be a valid URL !"});
   
    if(validator.isEmpty(req.body.desc))
  return res.json({success:false,msg:"Description can't be empty !"});
    
//===========================================================================================


  



Article.create(req.body,function(err,article){
if(err)
{
	   console.log("========================================");
	   console.log("Error in Create Article");
       console.log("========================================");
       console.log(err);
   return res.json({success:false,msg:"Somthing went wrong !"}); 

}
else
{
   article.author.id=req.user._id;
   article.author.name=req.user.name;
   	article.save();

   return res.json({success:true,msg:"New Article Added ", article:article});	
}


});



});




//========================
//UPDATE ARTICLE
//========================

router.put("/articles/:id",middleware.auth,middleware.checkUser,function(req,res){
//=====================================VALIDATIONS ==========================================
if((req.body.title&&req.body.image&&req.body.desc)==undefined)
   return res.json({success:false,msg:"Please provide valid inputs !"});

    if(!validator.isURL(req.body.image,{protocols:['http','https']}))
   return  res.json({success:false,msg:"Image must be a valid URL !"});
   
    if(validator.isEmpty(req.body.desc))
  return res.json({success:false,msg:"Description can't be empty !"});
//===========================================================================================

Article.findByIdAndUpdate(req.params.id,req.body,{new:true},function(err,updated){

if(err)
{
    console.log("========================================");
    console.log("Error in  Article Update");
    console.log("========================================");
	console.log(err);
   return res.json({success:false,msg:"Somthing went wrong !"});

}
else
{


return  res.json({success:true,msg:"Article updated successfully.",article: updated});
}

});


});

//========================
//DELETE ROUTE
//========================


router.delete("/articles/:id",middleware.auth,middleware.checkUser, function(req,res){
Article.findByIdAndRemove(req.params.id,function(err){

if(err)
{
	console.log("========================================");
    console.log("Error in Delete Article");
    console.log("========================================");
    console.log(err);
   return res.json({success:false,msg:"Somthing went wrong !"});
}
else
{
   return res.json({success:true,msg:"Article deleted"});
    
}

});

});



module.exports=router; 