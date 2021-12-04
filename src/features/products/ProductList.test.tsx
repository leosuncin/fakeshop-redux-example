import { render, screen, waitFor } from '@testing-library/react';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { createStore } from '../../app/store';
import products from '../../fixtures/products.json';
import ProductList from './ProductList';

describe('<ProductList />', () => {
  it('render the list of products', async () => {
    const store = createStore();

    fetchMock.getOnce('path:/products', products);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/' }]}>
          <Routes>
            <Route path="/" element={<ProductList />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() =>
      expect(store.getState().products.products.length).to.be.greaterThan(0),
    );
    await screen.findAllByTestId('product-item');

    expect(screen.getAllByTestId('product-item')).to.have.length(
      store.getState().products.products.length,
    );
  });
});
