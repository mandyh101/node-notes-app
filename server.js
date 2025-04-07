import http from "node:http";

// setting up a server using node instead of a ppackage like express
// this is a simple server that will respond with "Hello World" to any request
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
