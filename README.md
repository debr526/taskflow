# TaskFlow - Task Management Application

## About The Project

We built this task management app for my Node.js group project. It helps users keep track of things they need to do. You can create tasks, mark them as complete, edit them, or delete them. Each user has their own account so only they can see their tasks.

We worked on this project with my group member Ephrem. I did most of the backend work and Ephrem helped with frontend work and changes and testing.

## Group Members
- Dayan - Backend developer (server, database, routes)
- Ephrem - Frontend developer (CSS, testing)

## Features

### User Authentication
- Users can register with name, email, and password
- Passwords are encrypted using bcrypt
- Users login with email and password
- Sessions keep users logged in

### Task Management (CRUD)
- Create tasks with title and description
- Read all tasks on the dashboard page
- Update tasks (edit title, description, or status)
- Delete tasks you no longer need

### Dashboard
- Shows all your tasks in a table
- Displays task statistics (total, completed, pending)
- Buttons to edit, delete, or toggle task status

### Design
- Uses Bootstrap 5 for layout
- Responsive so it works on mobile and desktop
- Custom CSS for colors and animations

## Technologies Used

### Backend
- Node.js - JavaScript runtime
- Express.js - Web framework for routing and middleware
- PostgreSQL - Database to store users and tasks
- express-session - For login sessions
- bcrypt - To hash passwords

### Frontend
- EJS - Template engine to render HTML
- EJS Partials - Used for header and footer (research component)
- Bootstrap 5 - CSS framework
- Custom CSS - For additional styling

### Development Tools
- nodemon - Auto-restart server during development
- Git - Version control

## Database Schema

I have two tables in PostgreSQL:

**Users table**
- id (primary key)
- name
- email (unique)
- password (hashed)
- created_at

**Tasks table**
- id (primary key)
- title
- description
- status (pending or completed)
- user_id (foreign key that links to users)
- created_at

One user can have many tasks. When a user is deleted, their tasks are also deleted (cascade delete).

## Installation Steps

### Prerequisites
- Node.js installed on my computer
- PostgreSQL installed on my computer

### Step 1: Clone or download the project
Download the project folder to your computer or clone from GitHub.

### Step 2: Install dependencies
Open terminal in the project folder and run:
npm install

### Step 3: Create the database
Open PostgreSQL and run:
CREATE DATABASE taskflow;

### Step 4: Run the setup script
psql -U postgres -d taskflow -f db/setup.sql

### Step 5: Update database password
Open db/database.js and change the password to your PostgreSQL password.

### Step 6: Start the application
npm run dev

### Step 7: Open in browser
Go to http://localhost:3000

## How to Use

1. Register a new account with your name, email, and password
2. Login with your email and password
3. Click "New Task" to add a task
4. On the dashboard you can see all your tasks
5. Click the check button to mark a task as complete
6. Click the edit button to change task details
7. Click the delete button to remove a task
8. Click logout when you are done

## Challenges I Faced

The hardest part was learning how to use EJS partials because we didn't cover it much in class. I had to watch YouTube videos and read documentation to figure out how to reuse the header and footer on every page.

Another challenge was setting up PostgreSQL and getting the connection to work. I had to make sure the password was correct and the database was created.

## What I Learned

- How to build a full web application from scratch
- How to use Express.js for routing and middleware
- How to connect Node.js to PostgreSQL
- How to use EJS with partials
- How to implement user authentication with sessions and bcrypt
- How to push code to GitHub

## GitHub Repository
https://github.com/debr526/taskflow

## Submission Date
June 15, 2026
