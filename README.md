# **Social App Posts Management System**

## **Project Overview**

The **Social App Posts Management System** is a Node.js-based application designed for efficient post management. The app interacts with posts stored in a MongoDB database and fetches additional posts from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/posts). It provides a user-friendly interface to view, add, edit, and delete posts, combining a seamless backend and a dynamic front-end for optimal performance.

---

## **Key Features**

1. **Fetch Posts**: Pulls data from the JSONPlaceholder API and stores it in a local MongoDB database.
2. **View All Posts**: Displays all posts with options to edit or delete.
3. **Add New Post**: Allows users to create new posts via a form.
4. **Edit Post**: Enables users to update the title and description of posts.
5. **Delete Post**: Provides functionality to remove posts from the database.
6. **Form Validation**: Ensures proper validation of title and description fields when adding or editing posts.

---

## **Technologies Used**

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web application framework for handling routes and middleware.
- **MongoDB**: NoSQL database for storing post data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **EJS**: Templating engine to dynamically render HTML views.
- **Axios**: HTTP client for fetching posts from external APIs.

---

## **How It Works**

1. **Fetch API Data**: The application fetches 100 sample posts from the JSONPlaceholder API.
2. **Database Storage**: Posts are stored in the MongoDB database using Mongoose models.
3. **CRUD Operations**: Users can interact with the posts through Create, Read, Update, and Delete functionalities.

---

## **Upload Date**

- **Date**: 18/11/2024
