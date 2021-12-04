import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { createStore } from './app/store';
import products from './fixtures/products.json';

describe('<App>', () => {
  it('renders the app', () => {
    const store = createStore();

    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>,
    );

    expect(
      document.body.contains(
        screen.getByRole('heading', { name: /fakeshop/i }),
      ),
    );
  });

  it("navigate to product's details", async () => {
    const [product] = products;
    const store = createStore({
      products: {
        status: 'idle',
        products,
        product,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>,
    );

    user.click(screen.getByText(product.title));

    await screen.findByText(product.title);

    expect(screen.getByText(product.title)).to.exist;
  });
});
