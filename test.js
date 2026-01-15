/* eslint-disable */
const io = require('socket.io-client');
console.log('start');
const socket = io('https://example.com', {
  path: '/socket/chat',
  auth: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnYiOiJ0ZXN0Iiwic3ViIjoiZHVvbmdsb25nLmRldkBnbWFpbC5jb20iLCJ1YXYiOjEsImlhdCI6MTcxMzUxNDgxNSwiZXhwIjoxNzE2MTA2ODE1fQ.ecTR4tr-wUO61jeIw5L3XYSiHZBHk3LQO9q22UNHW6E',
  },
});

socket.on('connect', () => {
  console.log('connect', socket.id);
});

socket.on('disconnect', () => {
  console.log('disconnect', socket.id); // undefined
});
