import express, { json, urlencoded } from 'express';
import { RegisterRoutes } from '../build/routes';
import { apiReference } from '@scalar/express-api-reference';
import spec from '../build/swagger.json';

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
  '/docs',
  apiReference({
    spec: {
      content: spec,
    },
  }),
);

RegisterRoutes(app);

export { app };
