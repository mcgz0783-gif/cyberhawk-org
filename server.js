import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const JWT_SECRET = process.env.JWT_SECRET;

// ===== Auth Routes =====

// Sign up
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, name } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const { data, error } = await supabase.from('users').insert([{ email, password: hashed, name }]);
  if (error) return res.status(500).json({ error: error.message });
  const token = jwt.sign({ id: data[0].id }, JWT_SECRET);
  res.json({ token, user: data[0] });
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
  if (error || !data) return res.status(401).json({ error: 'Invalid email' });
  const match = await bcrypt.compare(password, data.password);
  if (!match) return res.status(401).json({ error: 'Invalid password' });
  const token = jwt.sign({ id: data.id }, JWT_SECRET);
  res.json({ token, user: data });
});

// Middleware to protect routes
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ===== Protected Routes =====

// Get all users
app.get('/api/users', authMiddleware, async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Add post
app.post('/api/posts', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const { data, error } = await supabase.from('posts').insert([{ title, content, user_id: req.user.id }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Get all posts
app.get('/api/posts', authMiddleware, async (req, res) => {
  const { data, error } = await supabase.from('posts').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
