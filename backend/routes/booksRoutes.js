const express = require('express');
const {Book} = require('../models/bookModels')

const router = express.Router();
//home

router.get('/',async(req,res)=>{
    try {
        const book = await Book.find({});
        res.status(201).json({
            count:book.length,
            data:book
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }
})
router.get('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        res.status(201).json({
            count:book.length,
            data:book
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }
})
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all the required fields: title, author, and publishYear"
            });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body, { new: true }).catch(() => null);
        if (!result) {
            return res.status(404).send({ message: "Book not found" });
        }
        res.status(200).send({ message: "Book is updated successfully", book: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});
router.delete('/:id',async(req,res)=>{
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all the required fields: title, author, and publishYear"
            });
        }
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            res.status(404).send({message:"Enter valid Book ID"});
        }
        else{
            res.status(201).send({message:`${result} got deleted`});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error})
    }
})
router.post('/',async(req,res)=>{
    try {
        if(!req.body.title||!req.body.author||!req.body.publishYear){
            return res.status(400).send({
                message:"send all the required feilds:title,author,publishYear",
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook);
        res.status(201).send(book);
    } catch(error) {
        console.log(error);
        res.status(500).send("error")
    }
})
module.exports = router;