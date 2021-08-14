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
  const updateProduct = productUuid => data => setCurrentProducts(
    previousProducts => previousProducts.map(product => {
      if (product.uuid === productUuid)
        return { ...product, ...data };
      return product;
    })
  )

  return (
    <div className="product-list">
      {currentProducts.map(
        product => <EditableProduct key={product.uuid} {...product} onSave={updateProduct(product.uuid)} />
      )}
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