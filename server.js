
const app =require('./backend/app')
const http = require('http')






const server = http.createServer(app)
const port = 3000;
app.set("port", port);
server.listen(port,()=>{
  console.log('connected to port 3000');
});
