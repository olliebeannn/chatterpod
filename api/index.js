import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './server/routes/UserRoutes';

const app = express();

const PORT = process.env.PORT | 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`App up on port ${PORT}`);
});

export default app;
