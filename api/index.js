require('dotenv').config();

const Nodemailer = require('nodemailer');
const Hapi = require('@hapi/hapi');
const Blipp = require('blipp');

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    routes: {
      cors: true,
    },
  });

  //  await server.register({ plugin: Blipp, options: { showAuth: true } });

  await server.register([
    require('./connectors'),
    require('./auth'),
    require('./routes'),
    { plugin: Blipp, options: { showAuth: true } },
  ]);

  // console.log(server.plugins.blipp.info());
  // const transporter = Nodemailer.createTransport({
  //   host: 'smtp.gmail.com',
  //   auth: {
  //     type: 'login',
  //     user: process.env.EMAIL_USERNAME,
  //     pass: process.env.EMAIL_PASSWORD,
  //   },
  // });
  // const info = await transporter.sendMail({
  //   from: process.env.EMAIL_USERNAME, // sender address
  //   to: 'cozzaenzo@gmail.com', // list of receivers
  //   subject: 'Hola puto', // Subject line
  //   text: 'Hello world?', // plain text body
  //   html: '<b>Hello world?</b>', // html body
  // });

  await server.start();
};

init();
