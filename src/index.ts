import express, { Express } from 'express';
import cors from 'cors';
import { AddressInfo } from 'net';
import { carRouter } from './Routes/Routes';

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use('/api', carRouter);

const { PORT = 3003 } = process.env;

const server = app.listen(PORT, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running in http://localhost:${address.port}`);
  } else {
    console.error(`Failed to run server.`);
  }
});
