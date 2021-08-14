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
      <div className="product-details--body">
        <div className="product-details--image-container">
          {!imageSrc ? (
            'No image'
          ) : (
            <img
              alt="Product"
              className="product-details--image"
              src={imageSrc}
            />
          )}
          <span className="product-details--price">
            {formatPrice(price)}
          </span>
        </div>
        <h3 className="product-details--title">{title}</h3>
        <h4 className="product-details--description">{description}</h4>
      </div>
      <div className="product-details--footer">
        <button className="product-details--buy-button">Buy Now</button>
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