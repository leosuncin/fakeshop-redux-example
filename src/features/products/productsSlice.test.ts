import { expect, use } from 'chai';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { AppState } from '../../app/store';
import products from '../../fixtures/products.json';
import productsReducer, {
  fetchProduct,
  fetchProducts,
  initialState,
  removeProduct,
  selectProduct,
  selectProducts,
} from './productsSlice';

use(sinonChai);

describe('Products slice', function () {
  context('reducer', function () {
    it('get initial state', function () {
      expect(productsReducer(undefined, { type: '' })).to.be.equal(
        initialState,
      );
    });

    it('set the products from API', function () {
      const fetchProductsPending = fetchProducts.pending('1');
      const fetchProductsFulfilled = fetchProducts.fulfilled(products, '1');

      const nextState = productsReducer(initialState, fetchProductsPending);

      expect(nextState).to.equal(initialState);
      expect(
        productsReducer(nextState, fetchProductsFulfilled),
      ).to.have.property('products', products);
    });

    it('set one product from API', function () {
      const [product] = products;
      const fetchProductsPending = fetchProduct.pending('2', product.id);
      const fetchProductsFulfilled = fetchProduct.fulfilled(
        product,
        '2',
        product.id,
      );

      const nextState = productsReducer(initialState, fetchProductsPending);

      expect(nextState).to.equal(initialState);
      expect(
        productsReducer(nextState, fetchProductsFulfilled),
      ).to.have.property('product', product);
    });

    it('remove product from state', function () {
      const [product] = products;
      const state = {
        ...initialState,
        product,
      };

      const nextState = productsReducer(state, removeProduct);

      expect(nextState).not.to.have.property('product');
    });
  });

  context('Thunk actions', function () {
    it('fetch all the products', async function () {
      const state: AppState = {
        products: initialState,
      };
      const dispatch = sinon.spy();
      const thunk = fetchProducts();

      fetchMock.getOnce('path:/products', products);
      await thunk(dispatch, () => state, undefined);

      expect(dispatch).to.have.callCount(2);
      expect(dispatch.getCall(0).args[0]).to.have.property(
        'type',
        fetchProducts.pending.type,
      );
      expect(dispatch.getCall(1).args[0]).to.have.property(
        'type',
        fetchProducts.fulfilled.type,
      );
    });

    it('fetch one product', async function () {
      const [product] = products;
      const state: AppState = {
        products: initialState,
      };
      const dispatch = sinon.spy();
      const thunk = fetchProduct(product.id);

      fetchMock.getOnce(/.*\/products\/\d+$/, product);
      await thunk(dispatch, () => state, undefined);

      expect(dispatch).to.have.callCount(2);
      expect(dispatch.getCall(0).args[0]).to.have.property(
        'type',
        fetchProduct.pending.type,
      );
      expect(dispatch.getCall(1).args[0]).to.have.property(
        'type',
        fetchProduct.fulfilled.type,
      );
    });
  });

  context('Selectors', function () {
    it('get products from state', function () {
      const state: AppState = {
        products: {
          ...initialState,
          products,
        },
      };

      expect(selectProducts(state)).to.be.equal(products);
    });

    it('get the product from state', function () {
      const [product] = products;
      const state: AppState = {
        products: {
          ...initialState,
          product,
        },
      };

      expect(selectProduct(state)).to.be.equal(product);
    });
  });
});
