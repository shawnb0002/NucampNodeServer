const express = require('express');
const authenticate = require('../authenticate');
const Favorite = require('../models/favorite');
const cors = require('./cors');


const favoriteRouter = express.Router();

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find()
    .populate('user')
    // .populate('campsites')
    .then(favorites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id})
    .then(favorite => {
        if(favorite){
            req.body.forEach(campsite => {
                if(!favorite.campsites.includes(campsite._id)){
                    favorite.campsites.push(campsite._id)
                }
            })
            favorite.save()
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        }
        else{
            Favorite.create({user: req.user._id, campsites: req.body})
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        }
    })

    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json');
    // res.json(req.file);
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})

.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id})
    Favorite.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});



favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /favorites');
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id})
    .then(favorite => {
        if(favorite.campsites.includes(campsite._id)){
            // favorite.campsites.push(campsite._id)
            res.end('That campsite is already in the list of favorites!')
        } else{
            Favorite.create({user: req.user._id, campsites: req.body})
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        }










        // if(favorite){
        //     req.body.forEach(campsite => {
        //         if(favorite.campsites.includes(campsite._id)){
        //             // favorite.campsites.push(campsite._id)
        //             res.end('That campsite is already in the list of favorites!')
        //         }
        //     })
        //     favorite.save()
        //     .then(favorite => {
        //         res.statusCode = 200;
        //         res.setHeader('Content-Type', 'application/json');
        //         res.json(favorite);
        //     })
        //     .catch(err => next(err));
        // }
        // else{
        //     Favorite.create({user: req.user._id, campsites: req.body})
        //     .then(favorite => {
        //         res.statusCode = 200;
        //         res.setHeader('Content-Type', 'application/json');
        //         res.json(favorite);
        //     })
        //     .catch(err => next(err));
        // }
    })

})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id})
    Favorite.deleteOne()
    .then(favorite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    })
    .catch(err => next(err));
});



module.exports = favoriteRouter;

// 5eefcf803fdc253f01af141b
// 5eefcf803fdc253f01af141c
// 5eefcf803fdc253f01af141d