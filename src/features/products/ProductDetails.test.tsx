import { render, screen, waitFor } from '@testing-library/react';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { createStore } from '../../app/store';
import ProductDetails from './ProductDetails';

describe('<ProductDetails />', () => {
  it('show the details of one product', async () => {
    const store = createStore();

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
