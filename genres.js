const express = require('express');
const router = express.Router();
const {genreSchema,validate} = require('../../models/genre');



// getting / reading  all genres

router.get('/', async (req,res)=>{
    const genres = await genreSchema.find()
    .sort('name');

    res.send(genres)
});



//getting / reading one genre

router.get('/:id', async (req,res)=>{
const genre =  await  genreSchema.findById(req.params.id)
       if (!genre)
       return res.status(404).send('the course with a given id has not been found');
       return res.send(genre);
    });



//post / creating genres 
router.post('/', async (req,res)=>{
 
    const {error} = validate(req.body) 
    if(error)
        //400 bad request 
        return res.status(400).send(error.message);
    

    let genre = new genreSchema({name:req.body.name})
        
    
    genre = await genre.save();
    res.send(genre);
}) 

//put/create aka|| updating genres 

 router.put('/:id', async(req,res) => {
    const {error} = validate(req.body);
    if (error) 
    return res.status(404).send(error.details[0].message);

    const genre = await genreSchema.findByIdAndUpdate(req.params.id,{ name: req.body.name},{
        new:true
    });
    if (!genre)
    return res.status(404).send('the course with a given id has not been found');

    res.send(genre);

 });
 router.delete('/:id',async (req,res)=>{
    const  genre = await genreSchema.findByIdAndRemove(req.params.id);

    if(!genre)return res.status(404).send('genre with the given id is not found')

    res.send(genre);
 });

 module.exports = router;