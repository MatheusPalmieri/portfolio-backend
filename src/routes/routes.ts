import { Router, Request, Response } from 'express';

const router = Router();

const defaultRoutes = [
  {
    path: '/ping',
    route: router.get('', (req: Request, res: Response) => {
      res.status(200).send('Server running!');
    }),
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
