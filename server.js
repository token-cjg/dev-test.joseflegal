const jsonServer = require("./node_modules/json-server");
const server = jsonServer.create();
const router = jsonServer.router("db/dev.json"); // Path to your JSON file
const middlewares = jsonServer.defaults();

// Add your custom middleware for CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:9001"); // Allows access from your Vue app
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // Handle OPTIONS method for pre-flight requests
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000; // Default port or port 3000
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
