import { IProductWithKey } from '../../interfaces';
import ProductDetails from '../ProductDetails/ProductDetails';
import './ProductList.scss';

export interface ProductListProps {
  items: IProductWithKey[];
  onAddToCart?: (productId: string) => void;
}

function ProductList({ items, onAddToCart }: ProductListProps): JSX.Element {
  const handleAddToCart = (productId: string) => () => {
    if (onAddToCart) onAddToCart(productId);
  };
  const hasItems = items.length > 0;

  return (
    <div className="product-list">
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
    </div>
  );
}

ProductList.defaultProps = Object.freeze({
  items: [],
});

export default ProductList;
