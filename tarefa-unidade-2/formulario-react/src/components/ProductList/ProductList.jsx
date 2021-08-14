import PropTypes from 'prop-types';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import './ProductList.css';
import EditableProduct from '../EditableProduct/EditableProduct';

function insertIdentifier(data) {
  return { ...data, uuid: uuid() };
}

function ProductList(props) {
  const { products } = props;
  const [currentProducts, setCurrentProducts] = useState(products.map(insertIdentifier));

  return (
    <div className="product-list">
      {currentProducts.map(product => <EditableProduct key={product.uuid} {...product} />)}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array
}

ProductList.defaultProps = {
  products: []
}

export default ProductList;