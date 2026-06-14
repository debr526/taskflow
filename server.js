const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your_secret_key_change_this',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/tasks/dashboard');
  }
  res.redirect('/auth/login');
});

app.get('/dashboard', (req, res) => res.redirect('/tasks/dashboard'));
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).render('404', { user: req.session.userId ? req.session.userName : null });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err.message, user: req.session.userId ? req.session.userName : null });
});

app.listen(PORT, () => {
  console.log(`TaskFlow running on http://localhost:${PORT}`);
});
