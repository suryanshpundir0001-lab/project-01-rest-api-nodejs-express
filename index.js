//jai SitaRam

const express = require("express");
const app = express();
const fs = require("fs");

const port = 8000;

//Middleware 
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//custom middlewares

app.use((req,res,next) => {
    console.log("hello from middleware 1");
    return res.json({msg : "hello from middleware 1"});
})//here is next ppointing to next thing which is my rote here

//is middleware ne naa to response ko end kiya 
//or na hi next function ko call kiya ...so output hold ho gya
//


//require the json data
const users = require("./MOCK_DATA.json");


//Defining a Routes here

//route 1 --> to list all the users

app.get("/users",(req,res)=>{   //to throw html docuemnt
    
    // we will do like this 
    /*
    <ul>
        <li>suryansh</li>

        what we do here we will take our users dynamically
        and unpe map krunga --> and for each user i return a string
         which is li tag  --> whcih contain user.firstname

         then i will do 
         res.send(html);
    
    */
   const html = `
   <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
   </ul>
   `;
   res.send(html);
})

app.get("/api/users",(req,res)=>{
    return res.json(users);

})

// route 2 Get user the with id 1,2,3,

//  which is dynamic path
//so we can't go like this /api/user/1 , then /api/users/2
//what if we have 1000 users...so we so like this
// this is called Dynamic Path Parameters 
// syntax --> /api/users/:id   ...: colon means dymanic

app.get("/api/users/:id",(req,res) =>{
    //first we nned to get this id ...means which id is this
    // const id = req.params.id;  // this is in string formal convert in number
    const id = Number(req.params.id);

    //now find this id in json data
    const user = users.find((user) => user.id == id);//aisa user jiski id match kar with my id
    return res.json(user);
})



// route 3  
//post req /api/users where we need to create a new user
//problem --> how to do post req cant do as browser bydefault fo get req
//tab tak route bana lete hai aage dekhlenge

app.post("/api/users",(req,res)=>{
    //TODO : create new user but as of now just
    //first get the properties that are comming
    const body = req.body;  //automatically req.body me sara fromtend ka data hota hai
    // console.log("Body",body);
    const newUser = { ...body, id: users.length + 1 };
    users.push(newUser); //id frontend se nhi aata thats way i am putting it manually 

    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users), (err, response)=>{
        return res.json({ status: "success", id: newUser.id });
    })
    
});

//route 4

app.patch("/api/users/:id",(req,res)=>{
    //TODO : edit the user with id
    return res.json({ status: "pending"});
});

// route 5
app.delete("/api/users/:id",(req,res)=>{
    //TODO : delete user with id
    return res.json({ status: "pending"});
});

//above we have /api/users as common so we can merge then and can write as


// SHORTCUT TO WRITE :)    Called as Grouping
// app.route("/api/users/:id") --> agar get req hai to ye karo , post hai to ye.....
// ***************************************************************************************************

// app.route("/api/users/:id").get((req,res)=>{
//     const id = Number(req.params.id);

//     //now find this id in json data
//     const user = users.find((user) => user.id == id);//aisa user jiski id match kar with my id
//     return res.json(user);
// }).patch((req,res)=>{ 
//     //Edit user with id
//     return res.json({status:"pending"});

// }).delete((req,res)=>{  //do something
//     //delete user with id
//     return res.json({status : "pending"});
// });



// ********************************************************************************************************

 


// listen the port 
app.listen(port, () => console.log(`Server started at port ${port}`));
