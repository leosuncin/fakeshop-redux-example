import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import type { AppDispatch } from '../../app/store';
import { ProductId } from '../../app/types';
import { fetchProduct, removeProduct, selectProduct } from './productsSlice';

const ProductDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productId } = useParams();
  const product = useSelector(selectProduct);

  useEffect(() => {
    if (productId) {
      void dispatch(fetchProduct(Number(productId) as ProductId));
    }

    return () => {
      dispatch(removeProduct());
    };
  }, [dispatch, productId]);

  return (
    <div className="ui grid container">
      {!product || Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img
                  className="ui fluid image"
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div className="column rp">
                <h1>{product.title}</h1>
                <h2 className="ui teal tag label">${product.price}</h2>
                <h3 className="ui brown block header">{product.category}</h3>
                <p>{product.description}</p>
                <div className="ui vertical animated button">
                  <div className="hidden content">
                    <i className="shop icon"></i>
                  </div>
                  <div className="visible content">Add to Cart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
