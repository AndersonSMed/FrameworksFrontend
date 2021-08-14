import PropTypes from 'prop-types';
import { useState } from 'react';
import './EditableProduct.css';
import ProductDetails from "../ProductDetails/ProductDetails";
import ProductForm from "../ProductForm/ProductForm";

function EditableProduct(props) {
  const [isEditing, setIsEditing] = useState(false);
  const onSave = (data) => {
    setIsEditing(false);
    props.onSave(data);
  };

  return (
    <div className="editable-product">
      {
        isEditing ? (
          <ProductForm {...props} onSave={onSave} />
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>
              Click here to edit
            </button>
            <ProductDetails {...props} />
          </>
        )
      }
    </div>
  );
}

EditableProduct.propTypes = {
  price: PropTypes.number,
  imageSrc: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onSave: PropTypes.func
}

EditableProduct.defaultProps = {
  price: 0,
  imageSrc: '',
  title: '',
  description: '',
  onSave: () => {}
}

export default EditableProduct;