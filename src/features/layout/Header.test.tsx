import { render, screen } from '@testing-library/react';
import { expect, use } from 'chai';
import chaiDom from 'chai-dom';

import Header from './Header';

use(chaiDom);

describe('<Header />', () => {
  it('should render', () => {
    render(<Header />);

    expect(screen.getByRole('heading')).to.have.text('FakeShop');
  });
});
