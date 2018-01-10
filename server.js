const server = require('server');
const { get, socket } = server.router;
const { send } = server.reply;
const fs = require('fs')


server({ port: 4567 }, [
  get('/', ctx => send(fs.readFileSync('index.html', 'utf-8'))),
  get('/youtube.js', ctx => send(fs.readFileSync('youtube.js', 'utf-8'))),

  // Receive a message from a single socket
  socket('request', ctx => {
    ctx.io.emit('request', ctx.data);
  }),
  
  socket('message', ctx => {

    // Send the message to every socket
    ctx.io.emit('message', ctx.data);
  })
]);
