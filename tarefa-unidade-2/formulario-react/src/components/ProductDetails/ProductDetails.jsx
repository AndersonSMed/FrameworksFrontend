import PropTypes from 'prop-types';

import './ProductDetails.css';

function formatPrice(price) {
  const parsedPrice = parseFloat(price);
  return `R$ ${parsedPrice.toFixed(2)}`;
}

function ProductDetails(props) {
  const { price, imageSrc, title, description } = props;

  return (
    <div className="product-details">
      <div className="product-details__body">
        <div className="product-details__image-container">
          {!imageSrc ? (
            'No image'
          ) : (
            <img
              alt="Product"
              className="product-details__image"
              src={imageSrc}
            />
          )}
          <span className="product-details__price">
            {formatPrice(price)}
          </span>
        </div>
        <h3 className="product-details__title">{title}</h3>
        <h4 className="product-details__description">{description}</h4>
      </div>
      <div className="product-details__footer">
        <button>Buy Now</button>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  price: PropTypes.number,
  imageSrc: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}

ProductDetails.defaultProps = {
  price: 0,
  imageSrc: '',
  title: '',
  description: ''
}

export default ProductDetails;