const express      = require("express"),
      app          = express(),
      methodOverride = require("method-override"),
      bodyParser   = require("body-parser"),
      mongoose     = require("mongoose")

const port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/restful_blogapp');
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'))
//schema creation
const blogSchema  =  new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type:Date , default:Date.now}
})

//Creating the model
const Blog = mongoose.model("Blog",blogSchema);

// Creating the database 
// Blog.create({
//     title:"Test Blog",
//     image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg",
//     body:"Welcome to the techky blog and in the purpose of writing this blog is to make u aware about the fake recreuting agencies",
//     });
    
app.get('/',function(req,res){
    res.redirect('/blogs');
}) 
//1st Restful Route i.e INDEX
app.get('/blogs',function(req,res){
    
    Blog.find({},function(error,allBlogs){
        if(error){  
            console.log('something went wrong');
            console.log(error);
        }else{
            res.render('index', {myBlogs:allBlogs});
        }
    })
  
}) 
    
    //NEW RESTful 
    
    app.get('/blogs/new',function(req,res){
        
        res.render('new');
    })
      
    //CREATE RESTful
    
    app.post('/blogs',function(req,res){
    
    Blog.create(req.body.blog,function(error,newBlog){
        if(error){
            console.log(error)
        }else{
            res.redirect('/blogs');
        }
    })
        
    })
    
    //SHOW RESTful 
    
    app.get('/blogs/:id',function(req ,res){
        //mongoose method of finding something by id
        Blog.findById(req.params.id,function(error,foundBlog){
            
            if(error){
                console.log(error)
            }else{
                res.render('show',{blog : foundBlog});
            }
            
        })
        
        
    })
    
    //EDIT RESTful blog app
    
    app.get('/blogs/:id/edit',function(req, res) {
        Blog.findById(req.params.id,function(error,foundBlog){
            if(error){
                console.log(error)
            }else{
                res.render('edit',{blog : foundBlog})
            }
        })
        
    })
    
    
    
    
    //UPDATE RESTful route
    
    app.put('/blogs/:id',function(req,res){
        
     Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(error,updatedBlog){
         if(error){
             console.log(error)
         }else{
             res.redirect('/blogs/' +req.params.id)
         }
     })
          })
    
    //DELETE RESTful route
    
    app.delete('/blogs/:id',function(req,res){
        Blog.findByIdAndRemove(req.params.id,function(error){
            if(error){
                console.log(error)
            }else{
                res.redirect('/blogs');
            }
        })
        
    })
    
    
    
   

app.listen(port,process.env.IP,function(){
    console.log('Our Blog app server has been started');
})