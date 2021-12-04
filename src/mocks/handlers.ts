import { rest } from 'msw';

import products from '../fixtures/products.json';

export const listAllProductsHandler = rest.get(
  /.*\/products$/,
  (_request, reply, context) => {
    return reply(context.json(products));
  },
);

export const getOneProductHandler = rest.get(
  /.*\/products\/(?<id>\d+)$/,
  (request, reply, context) => {
    const product = products.find(
      (product) => product.id === Number(request.params.id),
    );

    return reply(context.json(product));
  },
);
