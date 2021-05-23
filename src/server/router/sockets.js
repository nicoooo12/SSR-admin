const express = require('express');
// const axios = require('axios');

module.exports = function (app, socket) {
  const router = express.Router();
  app.use('/sockets', router);

  router.post('/updateInfo', async function (req, res, next) {
    // console.log('[id-user Sockets]', (req.params.user).slice(0, 12));
    socket.emit('change');
    res.json({
      message: 'ok',
    });
  });

  router.post('/updateInfo/:user', async function (req, res, next) {
    // console.log('[id-user Sockets]', (req.params.user).slice(0, 12));
    socket.emit([req.params.user]);
    res.json({
      message: 'ok',
    });
  });

  socket.on('connect', (io)=>{
    io.on('ok', async ()=>{
      console.log(io);
      // console.log('ok');
    });
    io.on('connectPlay', ()=>{
      socket.to(io.id).emit('connected', 1, 2);
    });
  });

};
