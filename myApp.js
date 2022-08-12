require('dotenv').config();
const mongoose = require('mongoose')

const MONGO_URI = process.env['MONGO_URI'].toString()

// console.log(MONGO_URI+"\n");

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
  type: Number
  },
  favoriteFoods: {
    type: [String]
  }
})

let Person = mongoose.model('Person', personSchema);

var fredFrederson = new Person(
  {name: "Fred Frederson",
   age: 23});
const createAndSavePerson = (done) => {
  fredFrederson.save(function(err, data) {
    if (err) return console.error(err);
    console.log("createAndSavePerson:", data.name, data._id);
    done(null, data)
    
  })
};

var bunchOfPeople = [
  {name: 'mikkel',
   age: 33,
   favoriteFoods: ['herring', 'rye bread']},
  {name: 'hans',
   age: 12,
  favoriteFoods: ['marzapan', 'strudel']},
  {name: 'john',
  age: 40,
  favoriteFoods: ['pizza', 'strudel']}
];


const createManyPeople = (bunchOfPeople, done) => {
  Person.create(bunchOfPeople, function(err, data) {
    if (err) return console.error(err);
    console.log("Create many people", data.name, data._id);
    done(null, data);
  })
};


const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
    if (err) return console.error(err);
    console.log("Find peoples", data.name, data._id);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data){
    if (err) return console.error(err);
    console.log("Find a food", data.name, data._id);
    done(null, data);
  })
};

// Modify the findPersonById to find the only person 
// having a given _id, using 
// Model.findById() -> Person. 
// Use the function argument personId as the search key.
const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function(err, data) {
    if (err) return console.error(err);
    console.log("Find by _id", data.name, data._id);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, function(err, data) {
    if (err) return console.error(err);
    console.log("Found _id to edit", data.name, data._id);
    data.favoriteFoods.push(foodToAdd);
    data.save((err, update) => {
      if (err) return console.err(err);
      done(null, update);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName },
                          { age: ageToSet },
                          { new: true },
                          (err, update) => {
    if (err) return console.error(err);
    done(null, update);
  });
};

const removeById = (personId, done) => {
  // findByIdAndRemove and findOneAndRemove pass the removed
  // document to the db. As usual, use the function argument
  // personId as the search key.
  Person.findByIdAndRemove(personId,
                           (err, data) => {
                             if (err) return console.error(err);
                             console.log("Found _id to remove:",
                                         data.name);
                             done(null, data);
                           });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove},
                (err, data) => {
                  if (err) return console.error(err);
                  console.log("Found data to remove", data);
                  done(null, data);
                });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort()
    .limit(2)
    .sort({name:1})
    .select({age:0})
    .exec((err, data) => {
    if (err) return console.error(err);
    console.log("Found data to remove", data);
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
