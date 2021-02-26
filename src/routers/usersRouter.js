import { Router } from 'express';
import usersController from '../controllers/usersController.js';
import { validateBody } from '../middleware/joiSchemaValidation.js';
import { validateToken } from '../middleware/tokenValidation.js';

import { authSchema } from '../apiSchema/usersSchema.js';

const usersRouter = Router();

usersRouter.post('/signup', validateBody(authSchema), usersController.signUp);

usersRouter.post('/signin', validateBody(authSchema), usersController.signIn);

usersRouter.get('/validate_token', validateToken, usersController.validateToken);

export default usersRouter;
