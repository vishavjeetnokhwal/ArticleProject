var express 			=     	 		require("express"),
mongoose                =       	   require("mongoose"),
bodyParser   			=           require("body-parser"),
Comment 				=     require("./models/Comments"),
User					=         require("./models/User"),
Article 				=      require("./models/Article");
passport			  	=    		   require("passport"),
cors					=    			   require("cors"),
JwtStrategy 			=          require('passport-jwt').Strategy,
jwt                     = 			require('jsonwebtoken'),
ExtractJwt 				=          require('passport-jwt').ExtractJwt;


//===================================ROUTES==================================


var articleRoute   =require("./routes/article"),
    commentRoute   =require("./routes/comment"),
    authRoute      =require("./routes/auth"),
    extraRoute     =require("./routes/extra");

//============================================================================




app = express();
mongoose.connect("mongodb://.mlab.com:53113/ng_article");
//mongoose.connect("mongodb://localhost/ng_article");

app.use(cors());

app.use(bodyParser.json());

app.use(passport.initialize());

app.use(passport.session());

require('./passport')(passport);





app.use(articleRoute);
app.use(commentRoute);
app.use(authRoute);
app.use(extraRoute);



//==============================================================================//

app.listen(process.env.PORT,process.env.IP,function(){
	console.log("server has start on PORT 3000");
});
