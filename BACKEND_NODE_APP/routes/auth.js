var express      =require("express"),
    router       =express.Router(),
    mongoose     =require("mongoose"),
     User	     =require("../models/User"),
     passport    =require("passport"),
	 bcrypt      =require("bcryptjs"),
	 jwt         =require("jsonwebtoken"),
	 validator   =require("validator"),
	 middleware  =require("./middlewares");
     




//================================
//		Authentication Routes
//================================



//=================================
//REGISTER
//=================================

router.post("/register",function(req,res)
	{

//=====================================VALIDATIONS ==========================================

   if((req.body.username&&req.body.password&&req.body.image&&req.body.name&&req.body.phone)==undefined)
   return res.json({success:false,msg:"Please provide valid inputs !"});

    if(!validator.isURL(req.body.image,{protocols:['http','https']}))
   return  res.json({success:false,msg:"Image must be a valid URL !"});
   
    if(validator.isEmpty(req.body.username&&req.body.password))
  return res.json({success:false,msg:"Username or Password can't be empty !"});
    
//===========================================================================================

		
		var newUser=new User(req.body);

		var password=req.body.password;


             bcrypt.genSalt(10,(err,salt)=>{
             	
             	bcrypt.hash(password,salt,(err,hash)=>{
             		if(err) throw err;
             		newUser.password=hash;

					 newUser.save((err,user)=>{

						 if(err)
						return res.json({success:false,msg:"This username is already registered !"});
						 if(user)
					   return res.json({success:true,msg:"You are Registered"});
						 
					 });
             	});
             });
		
	
	});


//=================================
//           LOGIN
//=================================

router.post('/login',(req,res,next)=>{
	const username =req.body.username;
	const password =req.body.password;

	User.findOne({username:username},(err,user)=>{
		if(err) 
			{
			console.log(err);
			return res.json({success:false, msg:"Somthing went wrong"});

			
			}
		if(!user)
		{
			return res.json({success:false, msg:"User not found !"});
		}
		
		User.comparePassword(password,user.password,(err,isMatch)=>{
		if(err) {
			console.log(err);
			return res.json({success:false, msg:"Somthing went wrong"});
		}

		if(isMatch)
		{
			const token=jwt.sign({data: user},'Hello world',{
				expiresIn:86400  // 1 Day
			});
			return res.json({

				success:true,
				msg:"Successfully login",
				token:`Bearer ${token}`,
				user:{
					
					id        :   user._id,
					name      :   user.name,
					username  :   user.username,
					date      :   user.date,
					isAdmin   :   user.isAdmin,
					phone     :   user.phone,
					activated :   user.activated,
					image     :   user.image

				}

			});	
		}

		else
		{
			return res.json({success:false,msg:"Wrong password"});
		}


		});
	});

});



//============================================
//               	FAILUARE REDIRECT
//============================================


router.get("/failureRedirect",function(req,res){

	return res.json({success:false,opt:1,msg:"You need to login first !"});
});




//LOGOUT================================

router.get("/logout",function(req,res)
	{
		req.logout();
		return res.json({success:true,msg:"Successfully Logged Out"});
	});





module.exports=router;