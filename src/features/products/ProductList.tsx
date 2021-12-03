import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Product } from '../../app/types';
import { fetchProducts, selectProducts } from './productsSlice';

export type ProductProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductProps) => {
  return (
    <div className="four wide column">
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
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

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
