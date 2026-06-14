const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db/database');
const { checkAuth, checkNotAuth } = require('../middleware/authMiddleware');

router.get('/register', checkNotAuth, (req, res) => res.render('register', { user: null }));

router.post('/register', checkNotAuth, async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    if (!name || !email || !password || !passwordConfirm) {
      return res.render('register', { message: 'Please provide all required fields', user: null });
    }

    if (password !== passwordConfirm) {
      return res.render('register', { message: 'Passwords do not match', user: null });
    }

    const userExists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.render('register', { message: 'Email is already in use', user: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);

    res.render('register', { message: 'User registered successfully! Please log in.', user: null });
  } catch (error) {
    console.error(error);
    res.render('register', { message: 'An error occurred during registration', user: null });
  }
});

router.get('/login', checkNotAuth, (req, res) => res.render('login', { user: null }));

router.post('/login', checkNotAuth, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render('login', { message: 'Please provide email and password', user: null });
    }

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.render('login', { message: 'Email or password is incorrect', user: null });
    }

    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordValid) {
      return res.render('login', { message: 'Email or password is incorrect', user: null });
    }

    req.session.userId = user.rows[0].id;
    req.session.userName = user.rows[0].name;
    req.session.userEmail = user.rows[0].email;

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('login', { message: 'An error occurred during login', user: null });
  }
});

router.get('/logout', checkAuth, (req, res) => {
  req.session.destroy(() => res.redirect('/auth/login'));
});

module.exports = router;
