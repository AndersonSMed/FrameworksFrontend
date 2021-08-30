import { IProductWithKey } from '../../interfaces';
import ProductDetails from '../ProductDetails/ProductDetails';
import './ProductList.scss';

export interface ProductListProps {
  items: IProductWithKey[];
  onAddToCart?: (uuid: string) => void;
}

function ProductList({ items, onAddToCart }: ProductListProps): JSX.Element {
  const handleAddToCart = (uuid: string) => () => {
    if (onAddToCart) onAddToCart(uuid);
  };
  const hasItems = items.length > 0;

  return (
    <div className="product-list">
      {hasItems ? (
        items.map((item) => (
          <ProductDetails key={item.uuid} onAddToCart={handleAddToCart(item.uuid)} {...item} />
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
