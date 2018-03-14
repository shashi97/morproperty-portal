import { ContactsApplication } from './src/application';
import { RestServer } from '@loopback/rest';

const app = new ContactsApplication();

app
  .start()
  .then(async () => {
    const server = await app.getServer(RestServer);
    console.log(`Server is running on port ${await server.get('rest.port')}`);
  })
  .catch(err => {
    console.error(`Unable to start application: ${err}`);
  });
