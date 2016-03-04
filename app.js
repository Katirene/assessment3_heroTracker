var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/assessment3');

mongoose.model(
    'Hero',
    new Schema({
        "alias": String,
        "first_name": String,
        "last_name": String,
        "city": String,
        "primary_power": String,
        "power_name": String
    },
    {
        collection: 'heroes'
    }
));

var Hero = mongoose.model('Hero');

mongoose.model(
    'SuperPowers',
    new Schema({
            "invisibility": String,
            "flight": Date,
            "super_speed": String,
            "heat_vision": String,
            "super_strength": String,
            "accelerated_healing": String,
            "power_blast": String,
            "animal_affinity": String
        },
        {
            collection: 'superpowers'
        }
    ));

var SuperPowers = mongoose.model('SuperPowers');


//Posts newly added Hero's and returns back a complete list of everything in database.
app.post('/addHero', function(req, res) {
    var addedHero = new Hero({
        "alias": req.body.alias,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "city": req.body.city,
        "primary_power": req.body.primary_power
    });

    addedHero.save(function (err, data) {
        if (err) {
            console.log('ERR: ', err);
        }

        Hero.find({}, function (err, data) {
            if (err) {
                console.log('ERR: ', err);
            }

            res.send(data);
        });
    });
});
//
////get and send back all heroes in db
//app.get('/getHero', function(req, res) {
//    console.log('here');
//    Hero.find({}, function(err, data) {
//        if(err) {
//            console.log('ERR: ', err);
//        }
//
//        res.send(data);
//    });
//});
//
////get heros only with certain super powers.
////pass the superpower as power_name in the URL params.
//app.get('/getHero/:power_name', function(req, res) {
//    console.log('here');
//    var power_name = req.body.power_name;
//    Hero.find({}.select({"power_name": power_name}), function(err, data) {
//        if(err) {
//            console.log('ERR: ', err);
//        }
//
//        res.send(data);
//    });
//});
//
////get and send back all SuperPowers in db for list population.
//app.get('/getPowers', function(req, res) {
//    console.log('here');
//    SuperPowers.find({}, function(err, data) {
//        if(err) {
//            console.log('ERR: ', err);
//        }
//
//        res.send(data);
//    });
//});
//
////update app.put :power_name to heroes database.
////finds document by ID and sets key of power_name to the req.body.power_name
//app.put('/updateHero/:id', function(req, res){
//    console.log('here is the req.body:', req.body);
//    var newSuperPower = req.body.power_name;
//    BlogPost.findByIdAndUpdate(
//        {_id: req.params.id},
//        {
//            $set: {power_name: newSuperPower}
//        },
//        function(err, data) {
//            if(err) {
//                console.log('ERR: ', err);
//            }
//
//            res.send(data);
//        }
//    );
//
//});
//
//
//
//
//
//
//
//
////app.get('/addBlogPost/:power_name', function(req, res) {
////    console.log('req.params.id', req.params.id);
////    SuperPowers.find({"_id" : req.params.id}, function(err, data) {
////        if(err) {
////            console.log('ERR: ', err);
////        }
////
////        res.send(data);
////    });
////});
//
//
//
////app.delete('/blogPost/:id', function(req, res) {
////    console.log('req.params.id', req.params.id);
////    BlogPost.findByIdAndRemove({"_id" : req.params.id}, function(err, data) {
////        if(err) {
////            console.log('ERR: ', err);
////        }
////
////        res.send(data);
////    });
////});



// Serve back static files
    app.use(express.static('public'));
    app.use(express.static('public/views'));
    app.use(express.static('public/scripts'));
    app.use(express.static('public/styles'));
    app.use(express.static('public/vendors'));

    app.set('port', process.env.PORT || 5000);
    app.listen(app.get('port'), function() {
        console.log('Listening on port: ', app.get('port'));
    });



//app.put('/blogPost/:id', function(req, res){
//    console.log('comments:', req.body.data);
//    var newComments = req.body.data;
//    BlogPost.findByIdAndUpdate(req.params.id
//        ,
//        {
//            $set: {comments: "newComments"}
//        },