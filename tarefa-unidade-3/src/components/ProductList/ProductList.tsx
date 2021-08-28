import { IProductWithKey } from "../interfaces";
import ProductDetails from "../ProductDetails/ProductDetails";
import './ProductList.scss';

export interface ProductListProps {
  items: IProductWithKey[];
  onAddToCart?: (uuid: string) => void;
}

function ProductList({ items, onAddToCart }: ProductListProps) {
  const handleAddToCart = (uuid: string) => () => {
    if(onAddToCart) onAddToCart(uuid);
  }
  const hasItems = items.length > 0;

  return (
    <div className="product-list">
      {hasItems ? (
        items.map(item => (
          <ProductDetails
            key={item.uuid}
            onAddToCart={handleAddToCart(item.uuid)}
            {...item}
          />
        ))  
      ) : (
        <div className="product-list__empty-message">
          There are no Products right now
        </div>
      )}
    </div>
  )
}

ProductList.defaultProps = Object.freeze({
  items: []
});

export default ProductList;