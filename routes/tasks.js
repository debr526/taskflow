const express = require('express');
const router = express.Router();
const pool = require('../db/database');
const { checkAuth } = require('../middleware/authMiddleware');

router.get('/dashboard', checkAuth, async (req, res) => {
  try {
    const tasks = await pool.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC', [req.session.userId]);
    res.render('dashboard', {
      user: req.session.userName,
      email: req.session.userEmail,
      tasks: tasks.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: 'Error loading dashboard', user: req.session.userName });
  }
});

router.get('/', checkAuth, (req, res) => res.redirect('/tasks/dashboard'));

router.get('/add', checkAuth, (req, res) => {
  res.render('addTask', { user: req.session.userName, email: req.session.userEmail });
});

router.post('/add', checkAuth, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).render('addTask', { message: 'Task title is required', user: req.session.userName, email: req.session.userEmail });
    }
    await pool.query('INSERT INTO tasks (title, description, status, user_id) VALUES ($1, $2, $3, $4)', [title, description || '', 'pending', req.session.userId]);
    res.redirect('/tasks/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: 'Error creating task', user: req.session.userName });
  }
});

router.get('/edit/:id', checkAuth, async (req, res) => {
  try {
    const task = await pool.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [req.params.id, req.session.userId]);
    if (task.rows.length === 0) {
      return res.status(404).render('error', { error: 'Task not found', user: req.session.userName });
    }
    res.render('editTask', { user: req.session.userName, email: req.session.userEmail, task: task.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: 'Error loading task', user: req.session.userName });
  }
});

router.post('/edit/:id', checkAuth, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title) {
      return res.status(400).render('editTask', { message: 'Task title is required', user: req.session.userName, email: req.session.userEmail, task: { id: req.params.id, title, description, status } });
    }
    const result = await pool.query('UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 AND user_id = $5 RETURNING *', [title, description || '', status, req.params.id, req.session.userId]);
    if (result.rows.length === 0) {
      return res.status(404).render('error', { error: 'Task not found', user: req.session.userName });
    }
    res.redirect('/tasks/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: 'Error updating task', user: req.session.userName });
  }
});

router.get('/delete/:id', checkAuth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *', [req.params.id, req.session.userId]);
    if (result.rows.length === 0) {
      return res.status(404).render('error', { error: 'Task not found', user: req.session.userName });
    }
    res.redirect('/tasks/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: 'Error deleting task', user: req.session.userName });
  }
});

router.get('/toggle/:id', checkAuth, async (req, res) => {
  try {
    const task = await pool.query('SELECT status FROM tasks WHERE id = $1 AND user_id = $2', [req.params.id, req.session.userId]);
    if (task.rows.length === 0) {
      return res.status(404).render('error', { error: 'Task not found', user: req.session.userName });
    }
    const newStatus = task.rows[0].status === 'pending' ? 'completed' : 'pending';
    await pool.query('UPDATE tasks SET status = $1 WHERE id = $2 AND user_id = $3', [newStatus, req.params.id, req.session.userId]);
    res.redirect('/tasks/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: 'Error toggling task status', user: req.session.userName });
  }
});

module.exports = router;
