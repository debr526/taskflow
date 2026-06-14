INSERT INTO users (name, email, password) VALUES
(
  'John Doe',
  'john@example.com',
  '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36jbMeFO'
),
(
  'Jane Smith',
  'jane@example.com',
  '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36jbMeFO'
),
(
  'Bob Wilson',
  'bob@example.com',
  '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36jbMeFO'
);

INSERT INTO tasks (title, description, status, user_id) VALUES
(
  'Complete project documentation',
  'Write comprehensive documentation for the TaskFlow project including installation, usage, and API documentation',
  'pending',
  1
),
(
  'Review pull requests',
  'Review and provide feedback on pending pull requests from team members',
  'completed',
  1
),
(
  'Fix authentication bug',
  'Fix the session timeout issue in auth middleware that occurs after 30 minutes of inactivity',
  'pending',
  1
),
(
  'Update dependencies',
  'Update all npm packages to their latest stable versions',
  'completed',
  1
);

INSERT INTO tasks (title, description, status, user_id) VALUES
(
  'Design UI mockups',
  'Create high-fidelity mockups for the new dashboard redesign',
  'in_progress',
  2
),
(
  'User testing',
  'Conduct user testing sessions with 5-10 test users to gather feedback',
  'pending',
  2
);

INSERT INTO tasks (title, description, status, user_id) VALUES
(
  'Database optimization',
  'Optimize database queries and add necessary indexes for better performance',
  'pending',
  3
),
(
  'Deploy to production',
  'Deploy the latest version to production servers',
  'pending',
  3
);

SELECT u.name, COUNT(t.id) as task_count
FROM users u
LEFT JOIN tasks t ON u.id = t.user_id
GROUP BY u.id, u.name
ORDER BY u.name;
