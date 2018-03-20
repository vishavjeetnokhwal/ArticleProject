var express      =require("express"),
    router       =express.Router(),
    Comment 	 =require("../models/Comments"),
    Article 		 =require("../models/Article"),
    User    =require("../models/User"),
    validator   =require('validator'),
    middleware   =require("./middlewares");
    
     





//CREATING NEW COMMENT ROUTE

router.post("/articles/:id/comment/", middleware.auth,function(req,res){

//=====================================VALIDATIONS ==========================================
// var trimedobj = validator.trim( req.body.content [ ]);
// console.log(trimedobj);
 // console.log( validator.isByteLeng/th(req.body.content,{min:1,max:100}) )

//  if( (req.body.content==undefined)|| !validator.isAscii(req.body.content))
//    return res.json({success:false,msg:"Comment can't be empty !"});
 
//===========================================================================================
			Article.findById(req.params.id,function(err,foundedArticle){

						if (err) {

							console.log("====================");
							console.log("Error in Comment Creation");
							console.log("====================");
							console.log(err);
							return res.json({success:false,msg:"Something went wrong !"});

						}
						else
						{  



								Comment.create(req.body,function(err,createdComment){
											
											if (err) {
											    console.log("====================");
											    console.log("Error in creating Comment");
											    console.log("====================");

												console.log(err);
							                 return res.json({success:false,msg:"Something went wrong !"});

											}
											else
											{

											    createdComment.author.id=req.user._id;
											    createdComment.author.name=req.user.name;
											    createdComment.author.image=req.user.image;
												createdComment.save();

												foundedArticle.comments.push(createdComment);
												foundedArticle.save();

												return res.json(createdComment);

											}
								});
								
							
						}

				});

});





//================================
//UPDATE COMMENT
//================================
router.put("/comment/:comment_id",middleware.auth,middleware.checkCommentPermission,function(req,res)
	{

           	

		Comment.findByIdAndUpdate(req.params.comment_id,req.body,{new:true},function(err,updateComment)
		{
           if(err)
           {
           	console.log("========================================");
       	        console.log("Error in  Updating Comment");
  		        console.log("========================================");
           	console.log(err);
			return res.json({success:false,msg:"Error in Updating the comment !"});

           	
           }
           else
           {
           	
	      return  res.json({success:true,msg:"Comment Updated",cmt:updateComment});
           }
         
		});
	});



//DESTROY A COMMENT

router.delete("/comment/:comment_id",middleware.auth,middleware.checkCommentPermission,function(req,res)
	{

		Comment.findByIdAndRemove(req.params.comment_id,function(err,response){

			if(err)
			{
				console.log("========================================");
       	        console.log("Error in  Delete Comment");
  		        console.log("========================================");
  		        console.log(err);
				
				return res.json({success:false,msg:"Error in delete the comment !"});


			}
			else{
						return res.json({success:true,msg:"Comment deleted !"});
					

			}



		});
	
	});


module.exports=router;