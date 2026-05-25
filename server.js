const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Login endpoint
server.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const db = router.db;
  const user = db.get('users').find({ email, password }).value();
  
  if (user) {
    res.json({
      success: true,
      user: { ...user, password: undefined },
      token: `fake-jwt-token-${user.id}-${user.role}`
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Register endpoint
server.post('/api/register', (req, res) => {
  const db = router.db;
  const users = db.get('users');
  const existingUser = users.find({ email: req.body.email }).value();
  
  if (existingUser) {
    res.status(400).json({ success: false, message: 'Email already exists' });
  } else {
    const newUser = {
      id: Date.now(),
      ...req.body,
      role: req.body.role || 'customer',
      createdAt: new Date().toISOString()
    };
    users.push(newUser).write();
    res.json({ success: true, user: { ...newUser, password: undefined } });
  }
});

// Auth middleware for protected routes
server.use('/api/protected', (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.includes('fake-jwt-token')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

server.use('/api', router);
server.listen(3000, () => {
  console.log('JSON Server with auth running on http://localhost:3000');
});
