var express      =require("express"),
    router       =express.Router(),
    Comment 	 =require("../models/Comments"),
    User	     =require("../models/User"),
    Article 	 =require("../models/Article"),
    middleware   =require("./middlewares");


//========================================================
//                LIKE ROUTE
//========================================================

router.get("/articles/:id/like",middleware.auth, function(req,res)
{
  Article.findById(req.params.id,function(err,foundArticle)
	{
		if(err){
			console.log(err);
			return res.json({success:false,msg:"Something went wrong !"});

		}
		else
		{
			User.findById(req.user._id,function(err,foundUser)
			{
				if(err){
					console.log(err);
					return res.json({success:false,msg:"Something went wrong !"});
				}
				else
				{

			
					
				User.find({"_id":req.user._id,"liked": req.params.id},function(err,data)
					{
					
					
						if(err){
							console.log(err);
							return res.json({success:false,msg:"Something went wrong !"});
						}
						else
						{
							
							if(data.length>0)
							{
								return res.json({success:false,msg:"You Have Already Liked"});
	               
							}
							else
							{

								foundArticle.likes++;
								foundArticle.save();
								foundUser.liked.push(foundArticle);
								foundUser.save();
								return res.json({success:true,msg:"You Liked This Article"});
							}
						}
					});
					
				}
			});
		}	
	});


});



//================
//PAYMENT ROUTE
//=================







router.get("/payments/:id",middleware.auth,function(req,res)
	{
       Article.findById(req.params.id,function(err,foundArticle)
       	{
       		if(err){

       			       console.log(err);
	             return res.json({success:false,msg:"Somthing went wrong !"});

       		      }
       		else
       		{

       			foundArticle.payee.push((req.user._id).toString());
       			foundArticle.save();
	             return res.json({success:true,msg:"Payment was successfull"});
       		}
       	});

	});




//====================
//   Admin Pannel 
//====================

router.get("/admin",middleware.auth,middleware.isAdmin,function(req,res)
	{

		User.find({_id:{$ne:req.user._id}},function(err,foundUsers)
			{
				if(err){
					console.log(err);
				  return res.json({success:false,msg:"Somthing went wrong"});
				   
				}
				else
				{
					return res.json({success:true,users:foundUsers});			
				}
			});
		
	});

// =====================
//USER ACTIVATION ROUTE
//======================
router.get("/admin/:id",middleware.auth,middleware.isAdmin,function(req,res)
	{
		User.findById(req.params.id,function(err,foundUser)
			{
				if(err){
					console.log(err);
			        return res.json({success:false,msg:"Somthing went wrong !"});

				}
				else
				{
					if(foundUser.activated)
					{
						foundUser.activated=false;
						foundUser.isAdmin=false;
						foundUser.save();
	                    return res.json({success:true,msg:"User "+foundUser.name+" Deactivated !",user:foundUser});   
					}
					else
					{
						foundUser.activated=true;
						foundUser.save();
	                    return res.json({success:true,msg:"User "+foundUser.name+" Activated.",user:foundUser});   
					}
				}
			});
	});


// =====================
//USER DELETION
//======================
router.delete("/admin/:id",middleware.auth,middleware.isAdmin,function(req,res)
	{
		User.findByIdAndRemove(req.params.id,function(err,foundUser)
			{
				if(err){
					console.log(err);
			         return res.json({success:false,msg:"Somthing went wrong !"});

				   }
				else
				{
	                   return  res.json({success:true,msg:"User "+foundUser.name+" Removed.",user:null});   
					
				}
			});
	});


//============================
//   MAKING ADMIN
//============================
router.get("/admin/:id/isAdmin",middleware.auth,middleware.isAdmin,function(req,res){

	User.findById(req.params.id,function(err,foundUser){
		if(err)
		{   
			console.log(err);
			return res.json({success:false,msg:"Somthing went wrong !"});
		}
		else
		{
			foundUser.isAdmin=true;
			foundUser.save();
			return res.json({success:true,msg:foundUser.name+" is now Admin.",user:foundUser});
		}
	});
});

module.exports=router;