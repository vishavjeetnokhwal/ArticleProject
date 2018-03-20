var express      =require("express"),
    router       =express.Router(),
    Comment 	 =require("../models/Comments"),
    Article 		 =require("../models/Article"),
    User         =require("../models/User"),
    passport     =require("passport");
    
//MIDDLEWARES



var middleware={};

middleware.auth=passport.authenticate('jwt',{failureRedirect:"/failureRedirect",session:false});

middleware.isLoggedin= function(req,res,next)
		{
			
			if(req.user)
			{    
			//req.user1=req.user;
			   return next();	
			
			}
			else
			{

				return res.json({success:false,	msg:"You need to login first !"});
			}
		}


middleware.isAdmin= function(req,res,next)
		{

		
			User.findById(req.user._id,function(err,foundUser)
			{
				if(err){
					 console.log(err);
					  return res.json({success:false,msg:"Something went wrong"});

				   }
				else
				{
					if(foundUser.isAdmin===true)
					{    
						return next();
					}
					  return res.json({success:false,msg:"You are not an Admin"});
					
				}
			});
			
		}




middleware.checkUser=function(req,res,next)
{


		Article.findById(req.params.id,function(err,foundArticle)
			{
				if(err)
					{
						console.log(err);
						return res.json({success:false,msg:"Something Went Wrong !"});		
						
					}
				else
				{
					if(foundArticle)
					{
					if(foundArticle.author.id.equals(req.user._id)|| req.user.isAdmin===true )
					{
						return next();
					}

					else
					{   
					   return res.json({success:false,msg:"You don't have permission to do that"});
						
					}
					}
					else{
					    return res.json({success:false,msg:"This article is already deleted"});

					}
				}
			});
	




}


middleware.checkCommentPermission=function(req,res,next)
{


		Comment.findById(req.params.comment_id,function(err,foundComment)
			{

					

				if(err)
					{
					 return	res.json({success:false,msg:"Error in find the comment!"})

					}
				else
				{
					if(foundComment)
					{
					if(foundComment.author.id.equals(req.user._id)|| req.user.isAdmin)
					{
						
						return next();
					}

					else
					{
		
						return res.json({success:false,msg:"You don't have permission to do this !"})

					}
					}
					else
					{
		
						return res.json({success:false,msg:"This comment already is deleted !"})

					}

				}
			});




}

//==========================================
//    PAYMENT ROUTE
//=========================================

middleware.checkpayment=function(req,res,next)
   {

          
   	       Article.findById(req.params.id,function(err,foundArticle)
   	       	{
   	       		if(err){
   	       			console.log(err);   	       				
   	       			 return res.json({success:false,msg:"Somthing went wrong"});

   	       		}

   	       		else
   	       		{
							   	       if(foundArticle.author.id.equals(req.user._id)||req.user.isAdmin===true)
							   	       {
							   	     		return  next()
							   	       }
							   	       else
							   	       {

							   	       			if(foundArticle.likes>10)
							   	       			{
							   	       				Article.find({"_id":req.params.id, "payee":(req.user._id).toString()},function(err,data)
							   	  	                             {
							   	  		
													   	  		    if(err){
													   	  		      console.log(err);
   	       			                                                  return  res.json({success:false,msg:"Somthing went wrong"});
													   	  		    	
													   	  		    }
													   	  		
													   	  		   else
													   	  		           {

											   	  			            
													   	  		             if(data.length>0)
													   	  		             {     
													   	  		             	   
													   	  			             return  next();
													   	  		             }
													   	  		             else
													   	  		             {    
													   	  		             	   return res.json({success:false,opt:1,msg:"You Need To Pay First !"});
													   	  		             	   
													   	  		             }
											   	  	              	       }
											   	  	                });
							   	       			}

							   	       			else	
							   	       			{
							   	       				return next();
							   	       			}
							   	       	}

   	       		}
   	       	});

   	  
   }

middleware.isActivated=function(req,res,next)
{
    if(req.user.activated)
    {
    	return next();
    }
    else
    {
	  return res.json({success:false,opt:2,msg:"Your Activation is Pending !"});
    	
    }


}


module.exports=middleware;