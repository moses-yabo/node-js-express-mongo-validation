const express = require('express');
const router = express.Router();
const Joi = require('joi');



const courses = [
    {id:1,  name:'course1'},
    {id:2,  name:'course2'},
    {id:3,  name:'course3'},
    {id:4,  name:'course4'}
]

router.get('/',(req,res)=>{
    res.send(courses)
    });
    
    
    //post req
    
    router.post('/',(req,res)=>{
     
        const {error} = validateCourse(req.body) 
        if(error)
            //400 bad request 
            return res.status(400).send(error.message);
        
    
        const course = {
            id: courses.length+1,
            name:req.body.name
        };
        courses.push(course);
        res.send(course);
    })
    
    //get with parameters
    
    router.get('/:id',(req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) 
    return res.status(404).send('the course with the give in ID was not found');
    
       return res.send(course);
    
    });
    
    
    router.put('/:id',(req,res)=>{
        const course = courses.find((c)=>c.id === parseInt(req.params.id));
        if(!course)
            return res.status(404).send('the course with the give in ID was not found');
        
        const {error} = validateCourse(req.body)
             //400 bad request 
             if (error)
                return res.status(404).send(error.message);
         
       course.name = req.body.name;
       res.send(course)
    });
    
    // delete genre
    
    
    
    function validateCourse(course){
    
        const schema = Joi.object({
            name:Joi.string().min(3).required()
        });
        return schema.validate(course);
    };
    
    //delete course
    router.delete('/:id',(req,res)=>{
       // find the course ID and match it  using the route parameters
        const course = courses.find(c=>
            c.id === parseInt(req.params.id)
            );
        //check the if the course is unavailable if not send status 404 resource not available  
        if (!course) 
        return res.status(404).send('The body with given ID was not found')
    
        // find the index of the course then remove one item to the array
        const index = courses.indexOf(course);
        courses.splice(index,1);
        res.send(course);
    });

    module.exports = router;