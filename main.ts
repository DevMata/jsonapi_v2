import express from 'express';

import { blogs } from './routes/blogs';
import { connect } from './models/connection';

connect();

const app = express();
app.use(express.json());

app.use('/blogs', blogs);

app.listen(3000, () => console.log('Listenting on port 3000'));
