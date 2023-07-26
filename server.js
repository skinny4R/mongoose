const express = require("express")
const mongoose = require("mongoose");
const app = express();

         mongoose
           .connect('mongodb://127.0.0.1:27017/admin')
           .then(() => console.log("DB IS CONNECTED"))
           .catch((err) => console.log(err));
        
 const Person = require("./models/Person")

Person.insertMany([
  { name: "Amine", age: 28, favoriteFoods: ["fricassé", "mtabga", "mlewi"] },
  { name: "Mary", age: 24, favoriteFoods: ["rechta", "broudou", "chorba"] },
  {
    name: "Jack", age: 24, favoriteFoods: ["rechta", "broudou", "chorba", "burritos"],
  },
  { name: "Bassem", age: 23, favoriteFoods: ["lablebi", "spaghetti", "fruit de mer"],
  },
  { name: "Omar", age: 22, favoriteFoods: ["couscous", "jelbena", "me7chi"] },
  { name: "Lea", age: 24, favoriteFoods: ["rechta", "broudou", "chorba"] },
]);

const personList = async () =>  {
   const list =  await Person.find({})
} 
//console.log(personList());

             //find one by favorite foods :
Person.find({ favoriteFoods: "broudou" }, (err, data) => {
  if (err) throw err;
  // console.log(data)
});
            // find one by Id :
Person.findById("63f659377ec4a763227612f0", function (err, person) {
  if (err) {
   // console.log(err);
  } else {
   // console.log(person);
  }
});

            //find one by Id and Update:
Person.findByIdAndUpdate(
  "63f659377ec4a763227612f0", // ID of the person to update
  { $push: { favoriteFoods: " hamburger" } }, // use $push to append ' hamburger' to the name field
  { new: true }, // return the updated document
  function (err, person) {
    if (err) throw err 
     // console.log(person);
    
  }
);
           //find one by name and Update:   
Person.findOneAndUpdate(
  { name: "Lea" }, // query to find the document to update
  { age: 20 }, // set the age field to 20
  { new: true }, // return the updated document
  function (err, person) {
    if (err) throw err
   
      //console.log(person);
    }
  );
         // find by Id and Delete:
  Person.findByIdAndDelete(
    "63f659894368712a3a6e4139", // ID of the person to delete
    function (err, person) {
      if (err) throw err
        //console.log("Person deleted:", person);
      
    }
  );

         // Delete many documents:
Person.remove(
  { name: "Mary" }, // query to find the documents to delete
  function (err) {
    if (err) throw err
    
      //console.log("All Marys have been deleted!");
  
  }
);
          //Chain Search Query Helpers to Narrow Search Results:
Person
  .find({ favoriteFoods: "burritos" }) // find people who like burritos
  .sort("name") // sort them by name
  .limit(2) // limit the results to two documents
  .select("-age") // hide their age
  .exec(function (err, data) {
    // pass the done(err, data) callback to exec()
    if (err) throw err
   
      console.log(data);
    }
  );

app.listen(5000,(err)=>{
    if(err) throw err;
    console.log("server is up and running...");
});