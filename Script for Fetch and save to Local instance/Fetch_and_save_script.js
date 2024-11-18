const mongoose = require('mongoose');
const axios = require('axios');

// MongoDB Connection
const MONGO_URI = 'mongodb://localhost:27017/social';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('connected', () => console.log('Connected to MongoDB.'));
db.on('error', (err) => console.error('MongoDB connection error:', err));

// Define Mongoose Schema and Model
const postSchema = new mongoose.Schema({
  userId: Number,
  id: { type: Number, unique: true },
  title: String,
  body: String,
  timestamp: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

// Fetch and Save Data Function
const fetchAndSavePosts = async () => {
  try {
    // Fetch data from the API
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data;

    console.log(`Fetched ${posts.length} posts from API.`);

    // Insert or update posts in MongoDB
    for (const post of posts) {
      await Post.updateOne(
        { id: post.id }, // Search by unique post ID
        { $set: { ...post } }, // Update data if exists
        { upsert: true } // Insert if not found
      );
    }

    console.log('Data inserted/updated successfully.');
  } catch (error) {
    console.error('Error fetching or saving posts:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

// Run the Function
fetchAndSavePosts();
