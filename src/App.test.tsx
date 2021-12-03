import { render, screen } from '@testing-library/react';
import { expect } from 'chai';

import App from './App';

describe('<App>', () => {
  it('renders learn react link', () => {
    render(<App />);

    expect(
      document.body.contains(
        screen.getByRole('link', { name: /learn react/i }),
      ),
    );
  });
});
