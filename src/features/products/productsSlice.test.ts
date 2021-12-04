import { expect, use } from 'chai';
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

describe('Products reducer', () => {
  it('get initial state', () => {
    expect(productsReducer(undefined, { type: '' })).to.be.equal(initialState);
  });

  it('set the products from API', () => {
    const fetchProductsPending = fetchProducts.pending('1');
    const fetchProductsFulfilled = fetchProducts.fulfilled(products, '1');

    const nextState = productsReducer(initialState, fetchProductsPending);

    expect(nextState).to.equal(initialState);
    expect(productsReducer(nextState, fetchProductsFulfilled)).to.have.property(
      'products',
      products,
    );
  });

  it('set one product from API', () => {
    const [product] = products;
    const fetchProductsPending = fetchProduct.pending('2', product.id);
    const fetchProductsFulfilled = fetchProduct.fulfilled(
      product,
      '2',
      product.id,
    );

    const nextState = productsReducer(initialState, fetchProductsPending);

    expect(nextState).to.equal(initialState);
    expect(productsReducer(nextState, fetchProductsFulfilled)).to.have.property(
      'product',
      product,
    );
  });

  it('remove product from state', () => {
    const [product] = products;
    const state = {
      ...initialState,
      product,
    };

    const nextState = productsReducer(state, removeProduct);

    expect(nextState).not.to.have.property('product');
  });
});

describe('Thunk actions', () => {
  it('fetch all the products', async () => {
    const state: AppState = {
      products: initialState,
    };
    const dispatch = sinon.spy();
    const thunk = fetchProducts();

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

  it('fetch one product', async () => {
    const state: AppState = {
      products: initialState,
    };
    const dispatch = sinon.spy();
    const thunk = fetchProduct(products[0].id);

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

describe('Selectors', () => {
  it('get products from state', () => {
    const state: AppState = {
      products: {
        ...initialState,
        products,
      },
    };

    expect(selectProducts(state)).to.be.equal(products);
  });

  it('get the product from state', () => {
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
