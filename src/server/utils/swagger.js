import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  info: {
    title: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    description: process.env.APP_DESCRIPTION
  },
  basePath: '/api'
};

const swaggerOptions = {
  swaggerDefinition: swaggerDefinition,
  apis: [path.join(__dirname, '/../routes.js'),
  path.join(__dirname, '/../controllers/*js')]
};

let swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
