import {
  Card, CardContent, CardActions, Button, Chip, Tooltip,
} from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { formatPrice } from '../common';
import { IProduct } from '../interfaces';
import './ProductDetails.scss';

export interface ProductDetailsProps extends IProduct {
  onAddToCart?: (event: React.MouseEvent) => void;
}

export default function ProductDetails({ title, description, price, imageSrc, imageLabel, outOfStock, onAddToCart }: ProductDetailsProps) {
  const handleAddToCart = (event: React.MouseEvent) => {
    if (onAddToCart) onAddToCart(event);
  }

  const cartButton = (
    <Button
      className="product-details__action-button"
      variant="outlined"
      color="primary"
      onClick={handleAddToCart}
      disabled={!!outOfStock}
      disableElevation
    >
      Add to Cart
    </Button>
  );

  return (
    <Card className="product-details">
      <CardContent>
        <div className="product-details__image-container">
          <Chip className="product-details__price" label={formatPrice(price)} icon={<MonetizationOnIcon />} variant="outlined" />
          {imageSrc ?
            (
              <img src={imageSrc} aria-label={imageLabel} />
            ) : (
              <span className="product-details__no-image-message">No Image</span>
            )
          }
        </div>
        <div className="product-details__title">{title}</div>
        <div className="product-details__description">{description}</div>
      </CardContent>
      <CardActions>
        {outOfStock ? (
          <Tooltip title="This product is currently out of stock" aria-label="This product is currently out of stock">
            <span className="product-details__out-of-stock-tooltip">
              {cartButton}
            </span>
          </Tooltip>
        ) : (
          cartButton
        )}
      </CardActions>
    </Card>
  );
}

ProductDetails.defaultProps = Object.freeze({
  title: '',
  description: '',
  price: 0.00,
});
