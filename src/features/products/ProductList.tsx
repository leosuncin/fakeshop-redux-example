import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import type { AppDispatch } from '../../app/store';
import { Product } from '../../app/types';
import { fetchProducts, selectProducts } from './productsSlice';

export type ProductProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductProps) => {
  return (
    <div className="four wide column" data-testid="product-item">
      <Link to={`/product/${product.id}`}>
        <div className="ui link cards">
          <div className="card">
            <div className="image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="content">
              <div className="header">{product.title}</div>
              <div className="meta price">$ {product.price}</div>
              <div className="meta">{product.category}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);

  useEffect(() => {
    void dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="ui grid container">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
