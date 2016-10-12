/**
 * Created by alex on 28/09/2016.
 */

import express from 'express';

const app = express();

app.use('/', express.static('public'));

app.listen(process.env.PORT || 3001);
