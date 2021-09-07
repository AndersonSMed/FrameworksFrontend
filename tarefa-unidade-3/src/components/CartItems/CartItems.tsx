import { useState } from 'react';
import { Badge, Button, IconButton, Popover, Tooltip } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import { ICartItem, TCartAction } from '../../interfaces';
import './CartItems.scss';
import { formatPrice } from '../../common';

export interface CartItemsProps {
  items: ICartItem[];
  onChange?: (actionName: TCartAction, productId: string) => void;
}

export interface CartPopoverProps extends CartItemsProps {
  anchorEl: Element | undefined;
  onClose: () => void;
  isOpen?: boolean;
}

export interface CartItemProps extends ICartItem {
  onChange?: (actionName: TCartAction, productId: string) => void;
}

function CartItem({ title, quantity, price, productId, onChange }: CartItemProps) {
  const totalPrice = Number(quantity) * Number(price);
  const handleClick = (action: TCartAction) => () => {
    if (onChange) onChange(action, productId);
  };

  return (
    <div className="cart-items__item">
      <div className="cart-items__item-summary">
        <span className="cart-items__item-title" title={title}>
          {title}
        </span>
        <span className="cart-items__item-total-price">{formatPrice(totalPrice.toString())}</span>
      </div>
      <div className="cart-items__item-actions">
        <span className="cart-items__item-quantity">Total: {quantity}</span>
        <Tooltip title={`Add one more ${title}`}>
          <span>
            <IconButton
              size="small"
              aria-label={`Add one more ${title}`}
              onClick={handleClick('add')}
            >
              <AddIcon fontSize="small" color="action" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={`Remove one ${title}`}>
          <span>
            <IconButton
              size="small"
              aria-label={`Remove one ${title}`}
              onClick={handleClick('remove')}
            >
              <RemoveIcon fontSize="small" color="action" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={`Delete ${title} from cart`}>
          <span>
            <IconButton
              size="small"
              aria-label={`Delete ${title} from cart`}
              onClick={handleClick('delete')}
            >
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
          </span>
        </Tooltip>
      </div>
    </div>
  );
}

function CartPopover({ items, anchorEl, isOpen, onClose, onChange }: CartPopoverProps) {
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={!!isOpen}
      onClose={onClose}
    >
      <div className="cart-items__popover-container">
        {items.length > 0 ? (
          <>
            <div className="cart-items__summary">{formatPrice(totalPrice)}</div>
            {items.map((item) => (
              <CartItem key={item.productId} onChange={onChange} {...item} />
            ))}
            <Tooltip title="This option isn't available yet">
              <span>
                <Button
                  variant="outlined"
                  color="primary"
                  className="cart-items__checkout-button"
                  disabled
                >
                  Proceed to Checkout
                </Button>
              </span>
            </Tooltip>
          </>
        ) : (
          <span>Cart is empty</span>
        )}
      </div>
    </Popover>
  );
}

function CartItems({ items, onChange }: CartItemsProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<Element>();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const isPopoverOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(undefined);
  };

  return (
    <>
      <Tooltip title="Open cart">
        <span>
          <Badge badgeContent={totalItems} overlap="circular">
            <IconButton aria-label="Open cart" onClick={handleClick}>
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
        </span>
      </Tooltip>
      <CartPopover
        items={items}
        anchorEl={anchorEl}
        isOpen={isPopoverOpen}
        onClose={handlePopoverClose}
        onChange={onChange}
      />
    </>
  );
}

CartItems.defaultProps = Object.freeze({
  items: [],
});

export default CartItems;
