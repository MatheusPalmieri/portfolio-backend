import { Router, Request, Response } from 'express';

const router = Router();
// Routes
const projectRoute = require('./project.route');

const defaultRoutes = [
  {
    path: '/ping',
    route: router.get('', (req: Request, res: Response) => {
      res.status(200).send('Server running!');
    }),
  },
  {
    path: '/project',
    route: projectRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
