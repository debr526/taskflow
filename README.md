# TaskFlow - Task Management Application

A modern, full-stack task management web application built with **Node.js**, **Express.js**, **EJS**, and **PostgreSQL**. TaskFlow provides a clean and intuitive interface for users to manage their tasks efficiently with user authentication, CRUD operations, and real-time task status tracking.

## 🌟 Features

- **User Authentication**
  - User registration with password hashing (bcrypt)
  - User login with session management
  - Secure logout functionality
  - Password validation and confirmation

- **Task Management**
  - Create new tasks with title and description
  - View all tasks in a responsive dashboard
  - Edit existing tasks
  - Delete tasks with confirmation
  - Mark tasks as completed or pending
  - Real-time task statistics

- **Dashboard**
  - Overview of all user tasks
  - Task statistics (total, completed, pending)
  - Quick task status toggle
  - Responsive design for mobile and desktop

- **User Interface**
  - Clean and modern design with Bootstrap 5
  - Responsive navigation bar
  - Professional forms with validation
  - Alert messages for user feedback
  - Font Awesome icons for better UX

- **Security**
  - Session-based authentication
  - Password encryption with bcrypt
  - Protected routes with authentication middleware
  - User data isolation (users can only see their own tasks)
  - CSRF protection through session management

## 🛠️ Technologies Used

- **Backend:**
  - Node.js - JavaScript runtime
  - Express.js - Web application framework
  - PostgreSQL - Relational database
  - bcrypt - Password hashing library
  - express-session - Session management
  - body-parser - Request body parsing

- **Frontend:**
  - EJS - Server-side template engine
  - Bootstrap 5 - CSS framework
  - HTML5 - Markup language
  - CSS3 - Styling
  - JavaScript - Client-side scripting
  - Font Awesome - Icon library

- **Development Tools:**
  - npm - Package manager
  - nodemon - Development server auto-reload

## 📁 Project Structure

```
TaskFlow/
├── server.js                 # Main server entry point
├── package.json             # Project dependencies
├── public/
│   ├── style.css           # Custom CSS styles
│   └── script.js           # Client-side JavaScript
├── views/
│   ├── partials/
│   │   ├── header.ejs      # Navigation header partial
│   │   └── footer.ejs      # Footer partial
│   ├── login.ejs           # Login page
│   ├── register.ejs        # Registration page
│   ├── dashboard.ejs       # Task dashboard
│   ├── addTask.ejs         # Create task page
│   ├── editTask.ejs        # Edit task page
│   └── error.ejs           # Error page
├── routes/
│   ├── auth.js             # Authentication routes
│   └── tasks.js            # Task routes
├── middleware/
│   └── authMiddleware.js   # Authentication middleware
└── db/
    ├── database.js         # Database connection
    └── setup.sql           # Database setup script
```

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/)
- **npm** (comes with Node.js)

### Step 1: Clone or Extract the Project

```bash
# Navigate to where you want to install TaskFlow
cd C:\
# Extract the project folder
# Or clone if using Git
```

### Step 2: Install Dependencies

```bash
# Navigate to project directory
cd TaskFlow

# Install the required npm packages
npm install express ejs pg express-session bcrypt body-parser

# Install development dependencies if needed
npm install --save-dev nodemon
```

This will install:
- `express` - Web framework
- `ejs` - Template engine
- `pg` - PostgreSQL client
- `express-session` - Session management
- `bcrypt` - Password hashing
- `body-parser` - Request parsing
- `nodemon` - Development tool (dev dependency)

### Step 3: Database Setup

#### A. Create PostgreSQL Database

Open PostgreSQL (pgAdmin or command line) and run:

```sql
CREATE DATABASE taskflow;
```

#### B. Run Setup Script

Connect to the taskflow database and run the setup script:

```bash
# Using psql command line
psql -U postgres -d taskflow -f db/setup.sql

# Or copy and paste the contents of db/setup.sql in pgAdmin
```

This will create:
- **users table** - Stores user account information
- **tasks table** - Stores tasks linked to users
- **indexes** - For optimized database queries

#### C. Verify Database Setup

```sql
-- Run these commands to verify:
\dt                    -- List all tables
SELECT * FROM users;   -- Check users table
SELECT * FROM tasks;   -- Check tasks table
```

### Step 4: Configure Database Connection

Edit `db/database.js` and update the connection settings if needed:

```javascript
const pool = new Pool({
  user: 'postgres',           // Your PostgreSQL username
  host: 'localhost',          // Database host
  database: 'taskflow',       // Database name
  password: 'your_password',  // Your PostgreSQL password
  port: 5432,                 // PostgreSQL port
});
```

Or use environment variables:

```bash
# Create a .env file in the root directory
DB_USER=postgres
DB_HOST=localhost
DB_NAME=taskflow
DB_PASSWORD=your_password
DB_PORT=5432
```

## 🏃 Running the Application

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The application will start on `http://localhost:3000`

You should see:
```
✓ TaskFlow server is running on http://localhost:3000
✓ Connected to PostgreSQL database
```

## 📝 Usage

### 1. Register a New Account

- Navigate to `http://localhost:3000`
- Click "Register"
- Fill in: Name, Email, Password, Confirm Password
- Click "Register"

### 2. Login

- Click "Login"
- Enter your email and password
- Click "Login"

### 3. Dashboard

After login, you'll see your dashboard with:
- Task statistics (Total, Completed, Pending)
- List of all your tasks
- Quick action buttons

### 4. Create a Task

- Click "New Task" button
- Enter task title (required)
- Enter task description (optional)
- Click "Create Task"

### 5. Manage Tasks

- **Edit**: Click the edit icon to modify a task
- **Delete**: Click the delete icon to remove a task (with confirmation)
- **Toggle Status**: Click the check icon to mark task as completed/pending

### 6. Logout

- Click your username in the top-right
- Click "Logout"

## 🗄️ Database Schema

### Users Table

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Unique user identifier |
| name | VARCHAR(255) | User's full name |
| email | VARCHAR(255) UNIQUE | User's email address |
| password | VARCHAR(255) | Hashed password |
| created_at | TIMESTAMP | Account creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Tasks Table

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Unique task identifier |
| title | VARCHAR(255) | Task title |
| description | TEXT | Detailed task description |
| status | VARCHAR(50) | Task status (pending/completed) |
| user_id | INTEGER (FK) | Reference to user who owns the task |
| created_at | TIMESTAMP | Task creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## 🔒 Security Features

- **Password Hashing**: Uses bcrypt with salt rounds for secure password storage
- **Session Management**: Secure session handling with express-session
- **Authentication Middleware**: Protected routes require authentication
- **User Data Isolation**: Users can only access their own tasks
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Uses parameterized queries with pg library

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers (1920x1080 and up)
- Tablets (768px and up)
- Mobile devices (320px and up)

Bootstrap 5 is used for responsive grid system and components.

## 🎨 Customization

### Change Application Title

Edit `server.js` and `views/partials/header.ejs` to update the title.

### Modify Session Secret

Edit `server.js` line 27:
```javascript
secret: 'your_secret_key_change_this', // Change this!
```

### Customize Colors

Edit `public/style.css` CSS variables:
```css
:root {
  --primary-color: #007bff;
  --success-color: #28a745;
  --danger-color: #dc3545;
}
```

### Add New Features

1. Create new routes in `routes/` folder
2. Create corresponding EJS templates in `views/` folder
3. Add links in `views/partials/header.ejs`

## 🐛 Troubleshooting

### Issue: "Cannot find module 'express'"

**Solution**: Run `npm install` to install all dependencies

### Issue: "Error connecting to database"

**Solution**: 
- Verify PostgreSQL is running
- Check database credentials in `db/database.js`
- Verify database exists: `psql -l`

### Issue: "Port 3000 is already in use"

**Solution**: 
```bash
# Change PORT in server.js or set environment variable
PORT=3001 npm start
```

### Issue: "Tables don't exist"

**Solution**: Run the database setup script again
```bash
psql -U postgres -d taskflow -f db/setup.sql
```

## 📈 Future Enhancements

- [ ] Task categories/tags
- [ ] Task due dates and reminders
- [ ] Task priority levels
- [ ] Collaborative task sharing
- [ ] Task search and filtering
- [ ] Dark mode theme
- [ ] Email notifications
- [ ] File attachments for tasks
- [ ] Task history/audit log
- [ ] Two-factor authentication

## 📄 License

This project is open source and available under the ISC License.

## 👨‍💻 Author

Created for educational purposes as a comprehensive Node.js web application example.

## 📞 Support

For issues, questions, or suggestions, please refer to the code comments or create an issue.

---

**Happy Task Managing! 🚀**

Start using TaskFlow today and organize your tasks efficiently!
