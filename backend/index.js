
// import required modules
const express = require('express');
const path = require('path');
const app = express();

// serve static assets from the frontend build folder
app.use(express.static(path.join(__dirname, 'frontend/build')));

// handle all other requests by serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// set the port for the server to listen on
const port = process.env.PORT || 8080;
// start the server and listen on the allocated port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});