const express = require('express');
const ProductsService = require('../services/products');
const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

const productsApi = app => {
  const router = express.Router();
  app.use('/api/items', router);

  const productsService = new ProductsService();

  router.get('/', async ({ query }, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

    try {
      const results = await productsService.getProducts(query);

      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:productId', async ({ params: { productId } }, res, next) => {
    cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

    try {
      const product = await productsService.getProduct(productId);

      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  });
};

module.exports = productsApi;
