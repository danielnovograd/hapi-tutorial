'use strict'

const Hapi = require('hapi');
const inert = require('inert');
const Bcrypt = require('bcrypt');
const Basic = require('hapi-auth-basic');

//Create a server with a host and port
const server = new Hapi.Server();

//inert used to serve static page
server.register(inert, err => {
  if (err) throw err;

  server.route({
    method: 'GET',
    path: '/hello',
    handler: function(request, reply) {
      reply.file('./public/hello.html');
    }
  });
});

server.connection({port: 3000});

// Add the route
server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply){
    return reply('hello, world!')
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function(request, reply) {
    reply('Hello, ' + encodeURIComponent(request.params.name) + '!')
  }
});



//Start the server
server.start((err) => {
  if (err) throw err;
  console.log('Server running at:', server.info.uri)
});