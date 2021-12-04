import { render, screen, waitFor } from '@testing-library/react';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { createStore } from '../../app/store';
import products from '../../fixtures/products.json';
import ProductDetails from './ProductDetails';

describe('<ProductDetails />', function () {
  it('show the details of one product', async function () {
    const store = createStore();

    fetchMock.getOnce(/.*\/products\/\d+$/, products[0]);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/product/1' }]}>
          <Routes>
            <Route path="/product/:productId" element={<ProductDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/loading/i)).to.exist;

    await waitFor(
      () => expect(store.getState().products.product).not.to.be.undefined,
    );

    const product = store.getState().products.product!;

    expect(screen.getByText(product.title)).to.exist;
    expect(screen.getByText(RegExp(product.price))).to.exist;
    expect(screen.getByText(product.category)).to.exist;
  });
});
