// index.js

// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
let posts = []; // Using an array to store posts temporarily

// Initialize Express and middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes

// Home Page - display all posts
app.get("/", (req, res) => {
  res.render("index", { posts: posts });
});

// Post Creation - form submission creates a new post
app.post("/create-post", (req, res) => {
  const newPost = {
    title: req.body.title,
    content: req.body.content,
    id: posts.length + 1
  };
  posts.push(newPost);
  res.redirect("/"); // Redirect back to the home page to view all posts
});

// Navigate to Post Editing Page - render a form for editing a specific post
app.get("/edit/:id", (req, res) => {
  // Find the post by id
  const post = posts.find(p => p.id.toString() === req.params.id);
  if (post) {
    res.render("edit", { post: post }); // Render the edit page with the post data
  } else {
    res.send("Post not found");
  }
});

// Update the Post - handle the submission of the edit form
app.post("/update-post/:id", (req, res) => {
  const id = req.params.id;
  posts = posts.map(post => {
    if (post.id.toString() === id) {
      return {
        ...post,
        title: req.body.title,
        content: req.body.content
      };
    }
    return post;
  });
  res.redirect("/"); // Redirect back to the home page to view the updated post
});

// Post Deletion - remove a specific post
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  posts = posts.filter(post => post.id.toString() !== id);
  res.redirect("/"); // Redirect back to the home page
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
