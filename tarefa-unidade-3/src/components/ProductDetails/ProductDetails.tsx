import {
  Card, CardContent, CardActions, Button, Chip,
} from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { formatPrice } from '../common';
import './ProductDetails.scss';

export interface ProductDetailsProps {
  price: string | number;
  title?: string;
  description?: string;
  imageSrc?: string,
  imageLabel?: string,
  onAddToCart?: (event: React.MouseEvent) => void;
}

export default function ProductDetails({ title, description, price, imageSrc, imageLabel, onAddToCart }: ProductDetailsProps) {
  const handleAddToCart = (event: React.MouseEvent) => {
    if (onAddToCart) onAddToCart(event);
  }

  return (
    <Card className="product-details">
      <CardContent>
        <div className="product-details__image-container">
          <Chip className="product-details__price" label={formatPrice(price)} icon={<MonetizationOnIcon />} variant="outlined" color="secondary" />
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
        <Button className="product-details__action-button" variant="outlined" color="primary" onClick={handleAddToCart} disableElevation>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}

ProductDetails.defaultProps = Object.freeze({
  title: '',
  description: '',
  price: 0.00,
});
