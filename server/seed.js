const mongoose = require("mongoose");
require("dotenv").config();
const Book = require("./models/Book");

const seedBooks = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Book.insertMany([
    { title: "Can't Hurt Me", author: "David Goggins", price: 599 },
    {
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      price: 450,
    },
    { title: "12 Rules for Life", author: "Jordan Peterson", price: 520 },
    { title: "The 4-Hour Workweek", author: "Timothy Ferriss", price: 499 },
    { title: "Mindset", author: "Carol Dweck", price: 430 },
    { title: "The Lean Startup", author: "Eric Ries", price: 540 },
    { title: "Rework", author: "Jason Fried", price: 410 },
    { title: "Hooked", author: "Nir Eyal", price: 460 },
    { title: "Crushing It!", author: "Gary Vaynerchuk", price: 580 },
    {
      title: "The Hard Thing About Hard Things",
      author: "Ben Horowitz",
      price: 560,
    },

    { title: "Sapiens", author: "Yuval Noah Harari", price: 650 },
    { title: "Homo Deus", author: "Yuval Noah Harari", price: 670 },
    {
      title: "21 Lessons for the 21st Century",
      author: "Yuval Noah Harari",
      price: 620,
    },
    { title: "Educated", author: "Tara Westover", price: 480 },
    { title: "Becoming", author: "Michelle Obama", price: 700 },
  ]);

  console.log("Seed data inserted");
  process.exit();
};

seedBooks();
