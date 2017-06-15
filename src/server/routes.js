import {Router} from 'express';
import swaggerSpec from './utils/swagger';

let router = Router();

/**
 * Get swagger specifications
 */
router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

router.get('/', (req, res) => {
  console.log('repo hunter');
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

export default router;

