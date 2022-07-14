const {Customer , validate} = require('../../models/customer');
const express = require('express');
const router = express.Router();


// getting / reading  all genres

router.get('/', async (req,res)=>{
    const customers = await Customer.find()
    .sort('name');

    res.send(customers)
});

//getting / reading one customer

router.get('/:id', async (req,res)=>{
const customer =  await  Customer.findById(req.params.id)
       if (!customer)
       return res.status(404).send('the course with a given id has not been found');
       return res.send(customer);
    });

//post / creating customers 
router.post('/', async (req,res)=>{
 
    const {error} = validate(req.body) 
    if(error)
        //400 bad request 
        return res.status(400).send(error.message);
    

    let customer = new Customer({
        phone:req.body.phone,
        name:req.body.name,
        isGold:req.body.isGold
    })
        
    
    customer = await customer.save();
    res.send(customer);
}) 

//put/create aka|| updating customers 

 router.put('/:id', async(req,res) => {
    const {error} = validate(req.body);
    if (error) 
    return res.status(404).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,{
        phone:req.body.phone,
        name:req.body.name,
        isGold:req.body.isGold
    },{
        new:true
    });
    if (!customer)
    return res.status(404).send('the course with a given id has not been found');

    res.send(customer);

 });
 router.delete('/:id',async (req,res)=>{
    const  customer = await Customer.findByIdAndRemove(req.params.id);

    if(!customer)return res.status(404).send('customer with the given id is not found')

    res.send(customer);
 });

 module.exports = router;