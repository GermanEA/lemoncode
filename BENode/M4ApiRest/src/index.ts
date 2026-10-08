import {
  logRequestMiddleware,
  logErrorRequestMiddleware,
} from '#common/middlewares/index.js';
import { createRestApiServer, dbServer } from '#core/servers/index.js';
import { ENV } from '#core/constants/index.js';
import { houseApi } from '#pods/house/index.js';

const app = createRestApiServer();

app.use(logRequestMiddleware);

app.use('/api/houses', houseApi);

app.use(logErrorRequestMiddleware);

app.listen(ENV.PORT, async () => {
  if (!ENV.IS_API_MOCK) {
    await dbServer.connect(ENV.MONGODB_URL);
    console.log('Running DataBase');
  } else {
    console.log('Running Mock API');
  }
  console.log(`Server ready at port ${ENV.PORT}`);
});
