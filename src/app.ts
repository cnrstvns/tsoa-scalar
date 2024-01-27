import express, {
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
} from 'express';
import { RegisterRoutes } from '../build/routes';
import { apiReference } from '@scalar/express-api-reference';
import spec from '../build/swagger.json';
import { ValidateError } from 'tsoa';

type Spec = typeof spec;
type SchemaKey = keyof Spec['components']['schemas'];

/**
 * Fix to remove unused ugly types from Swagger spec
 * Looks like this: Pick_Major.Exclude_keyofMajor.id__​
 */
Object.keys(spec.components.schemas).forEach((key) => {
  if (key.startsWith('Pick')) {
    delete spec.components.schemas[key as SchemaKey];
  }
});

const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  }),
);
app.use(json());

app.use(
  '/reference',
  apiReference({
    spec: {
      content: spec,
    },
  }),
);

RegisterRoutes(app);

app.use(function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  if (err instanceof ValidateError) {
    /**
     * Prettify error messages from tsoa
     * For each key in error object, replace `requestBody.KEY_HERE` with `KEY_HERE` only
     */
    Object.keys(err.fields).forEach((key) => {
      const value = err.fields[key];
      const newKey = key.replace('requestBody.', '');
      delete err.fields[key];
      err.fields[newKey] = value;
    });

    return res.status(422).json({
      error: {
        code: 'parameter_missing',
        message: 'Missing at least one required parameter',
        params: err.fields,
      },
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }

  next();
});

export { app };
