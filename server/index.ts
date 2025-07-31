import express from 'express';
import routes from './endpoints';
import { initializeDatabase } from './db/init';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/endpoints', routes);

initializeDatabase();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});