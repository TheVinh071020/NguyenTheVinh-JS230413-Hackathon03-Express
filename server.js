const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
// Fetch api
app.use(bodyParser.json());
// Lấy dữ liệu 1 user
app.get("/api/v1/users/:id", (req, res) => {
  let { id } = req.params;
  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json"));
    // Tìm user với id trong params
    let user = users.find((e, i) => e.id === Number(id));
    if (!user) {
      res.json({
        messenge: " user not found",
      });
    } else {
      res.json({
        user: user,
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

// Lấy dữ  liệu toàn bộ users
app.get("/api/v1/users", (req, res) => {
  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json"));
    res.json({
      user: users,
      status: "success",
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

// Thêm mới dữ liệu về 1 user

app.post("/api/v1/users", (req, res) => {
  let { name, username, email, address, phone, website, company } = req.body;
  let user = {
    id: Math.floor(Math.random() * 1000000000000000),
    name,
    username,
    email,
    address: {
      street: address.street,
      suite: address.suite,
      city: address.city,
      zipcode: address.zipcode,
    },
    phone,
    website,
    company: {
      name: company.name,
      catchPhrase: company.catchPhrase,
      bs: company.bs,
    },
  };
  console.log(user);
  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json"));
    users.push(user);
    console.log(user);
    fs.writeFileSync("./data/users.json", JSON.stringify(users));
    res.json({
      messenge: "Thêm thành công",
    });
  } catch (error) {
    res.json({
      error: "error",
    });
  }
});

// Chỉnh sưa 1 user bằng email

app.put("/api/v1/users/:id", (req, res) => {
  // Tìm kiếm user với id trên params
  let { id } = req.params;
  let { email } = req.body;
  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json"));
    let userIndex = users.findIndex((e, i) => e.id === Number(id));
    console.log(userIndex);
    if (userIndex === -1) {
      res.json({
        message: "User not found",
      });
    } else {
      users[userIndex].email = email;
      fs.writeFileSync("./data/users.json", JSON.stringify(users));
      res.json({
        message: " Update thành công",
        user: users[userIndex],
      });
    }
  } catch (error) {
    res.json({
      error: "error delete",
    });
  }
});

// Xóa user

app.delete("/api/v1/users/:id", (req, res) => {
  let { id } = req.params;
  let users = JSON.parse(fs.readFileSync("./data/users.json"));
  let updatedUsers = users.filter((user, index) => user.id != id);
  fs.writeFileSync("./data/users.json", JSON.stringify(updatedUsers));
  res.json({
    message: "Delete user successfully",
  });
});

// Lấy dữ liệu 1 posts
app.get("/api/v2/posts/:id", (req, res) => {
  let { id } = req.params;
  try {
    let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
    // Tìm post với id trong params
    let post = posts.find((e, i) => e.id === Number(id));
    if (!post) {
      res.json({
        messenge: " post not found",
      });
    } else {
      res.json({
        post: post,
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

// Lấy dữ  liệu toàn bộ posts
app.get("/api/v2/posts", (req, res) => {
  try {
    let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
    res.json({
      post: posts,
      status: "success",
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

// Thêm mới dữ liệu về 1 post

app.post("/api/v2/posts", (req, res) => {
  let { title, body } = req.body;
  let post = {
    id: Math.floor(Math.random() * 1000),
    userId: 11,
    title,
    body,
  };
  console.log(post);
  try {
    let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
    posts.push(post);
    console.log(post);
    fs.writeFileSync("./data/posts.json", JSON.stringify(posts));
    res.json({
      messenge: "Thêm thành công",
    });
  } catch (error) {
    res.json({
      error: "error",
    });
  }
});

// Chỉnh sưa post

app.put("/api/v2/posts/:id", (req, res) => {
  let { id } = req.params;
  let { title, body } = req.body;
  try {
    let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
    let postIndex = posts.findIndex((e, i) => e.id === Number(id));
    console.log(postIndex);
    if (postIndex === -1) {
      res.json({
        message: "User not found",
      });
    } else {
      posts[postIndex].title = title;
      posts[postIndex].body = body;
      fs.writeFileSync("./data/posts.json", JSON.stringify(posts));
      res.json({
        message: " Update thành công",
        post: posts[postIndex],
      });
    }
  } catch (error) {
    res.json({
      error: "error",
    });
  }
});

// Xóa post

app.delete("/api/v2/posts/:id", (req, res) => {
  let { id } = req.params;
  let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
  let updatedPosts = posts.filter((user, index) => user.id != id);
  fs.writeFileSync("./data/posts.json", JSON.stringify(updatedPosts));
  res.json({
    message: "Delete post successfully",
  });
});


//Lấy toàn bộ post của 1 user
app.get("/api/v1/users/:id/posts", (req, res) => {
  let { id } = req.params;
  let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
  let postUser = posts.filter((post) => post.userId == id);
  res.json({ postUser });
});



app.listen(port, () => {
  console.log(`Server is running on: http://localhost: ${port}`);
});
