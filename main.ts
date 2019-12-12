import express from 'express';

import { blogs } from './src/routes/blogs';
import { connect } from './src/models/connection';

connect();

const app = express();
app.use(express.json());

app.use('/blogs', blogs);

app.listen(3000, () => console.log('Listenting on port 3000'));
