const Book = require('../models/book')

//to create book
const createBook = async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      price: req.body.price
    })
    const savedBook = await newBook.save()
    res.status(201).json(savedBook)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
};

//read all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
    // console.log(books)
    res.json(books)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

//read by id
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    // console.log(book)
    res.json(book)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
//Update the book details
const updateBook = async (req, res) => {
  try{
    let updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  if(!updatedBook) {
    return res.status(404).json({message : "Book not found"})
  }

  res.json(updatedBook)
  }
  catch(err) {
    res.status(400).json({ error : err.message})
  }
}

//delete by id
const deleteBook = async (req,res) => {
  try{
    const deletedBook = await Book.findByIdAndDelete(req.params.id)
    if(!deletedBook){
      return res.status(404).json({error: "Book not found"})
    }
    res.json({message : "Book deleted successfully"})
  }
  catch(err) {
    res.json({error : err.message})
  }
}

// console.log(this.createBook)
module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};