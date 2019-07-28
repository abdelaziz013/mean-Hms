
const app =require('./app')
const http = require('http')


// start---------------------------------
// const normalizePort = val => {
//   var port = parseInt(val, 10);

//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }

//   if (port >= 0) {
//     // port number
//     return port;
//   }

//   return false;
// };

// const port = normalizePort(process.env.PORT || "3000");
// app.set("port", port);
// end----------------------
const server = http.createServer(app)

//remove
const port = 3000;
//
server.listen(port,()=>{
  console.log('connected to port 3000');
});
