import {
  Card, CardContent, CardActions, Button,
} from '@material-ui/core';
import { formatPrice } from '../common';

export interface ProductDetailsProps {
  price: string | number;
  title?: string;
  description?: string;
  onAddToCart?: (event: React.MouseEvent) => void;
}

export default function ProductDetails({ title, description, price, onAddToCart }: ProductDetailsProps) {
  const handleAddToCart = (event: React.MouseEvent) => {
    if (onAddToCart) onAddToCart(event);
  }

  return (
    <Card className="product-details">
      <CardContent>
        <h2 className="product-details__title">{title}</h2>
        <span>{description}</span>
        <span>{formatPrice(price)}</span>
      </CardContent>
      <CardActions>
        <Button variant="outlined" color="primary" onClick={handleAddToCart} disableElevation>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}

ProductDetails.defaultProps = Object.freeze({
  title: '',
  description: '',
  price: 0.00,
});
