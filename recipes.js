const express = require('express');
const { redirect } = require('express/lib/response');
const Joi = require('joi');

const db = require('./connection');
const recipes = db.get('recipes');

const schema = Joi.object().keys({
    recipeTitle: Joi.string().trim().required(),
    recipeIngredients: Joi.string().trim().required(),
    steps: Joi.string().trim().required(),
});

const router = express.Router();

router.get('/:key', (req,res)=>{
    recipes.find({_id: req.params['key']}).then (records =>{
        res.json(records);
    })
});


router.post('/', (req,res, next)=>{
    const result = schema.validate(req.body);
    if(!result.error){
        recipes.insert(req.body).then(recipe =>{
        res.json(recipe);
        }); 
    }
});


function respondError422(res,next, msg){
    res.status(422);
    const error = new Error(msg);
    next(error);
}

module.exports = router;