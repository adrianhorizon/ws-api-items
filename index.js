const express = require('express');
const app = express();
const cors = require('cors');
const { config } = require('./config/index');
const productsApi = require('./routes/products');
const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(express.json());
app.use(cors());

productsApi(app);

app.use(notFoundHandler);
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => console.log(`Listening ${config.port}`));
