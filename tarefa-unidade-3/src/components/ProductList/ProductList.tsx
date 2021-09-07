import { IProductWithKey } from '../../interfaces';
import ProductDetails from '../ProductDetails/ProductDetails';
import Spinner from '../Spinner/Spinner';
import './ProductList.scss';

export interface ProductListProps {
  items: IProductWithKey[];
  isLoading: boolean;
  onAddToCart?: (productId: string) => void;
}

function ProductList({ items, isLoading, onAddToCart }: ProductListProps): JSX.Element {
  const handleAddToCart = (productId: string) => () => {
    if (onAddToCart) onAddToCart(productId);
  };
  const hasItems = items.length > 0;

  return (
    <div className="product-list">
      {isLoading ? (
        <div className="product-list__spinner">
          <Spinner />
        </div>
      ) : (
        <>
          {hasItems ? (
            items.map((item) => (
              <ProductDetails
                key={item.productId}
                onAddToCart={handleAddToCart(item.productId)}
                {...item}
              />
            ))
          ) : (
            <div className="product-list__empty-message">No products were found</div>
          )}
        </>
      )}
    </div>
  );
}

ProductList.defaultProps = Object.freeze({
  items: [],
  isLoading: false,
});

export default ProductList;
