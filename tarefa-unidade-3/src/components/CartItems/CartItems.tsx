import { useState } from "react";
import { Badge, IconButton, Popover, Tooltip } from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import { ICartItem } from "../interfaces";
import './CartItems.scss';
import { formatPrice } from "../common";

type CartAction = 'increase' | 'decrease' | 'remove';

export interface CartItemsProps {
  items: ICartItem[];
  onChange?: (actionName: CartAction, uuid: string) => void;
};

export interface CartPopoverProps extends CartItemsProps {
  anchorEl: Element | undefined;
  onClose: () => void;
  isOpen?: Boolean;
}

export interface CartItemProps extends ICartItem {
  onChange?: (actionName: CartAction, uuid: string) => void;
}

function CartItem({ title, quantity, price, uuid, onChange }: CartItemProps) {
  const totalPrice = Number(quantity) * Number(price);

  return (
    <div className="cart-items__item">
      <div className="cart-items__item-summary">
        <span className="cart-items__item-title" title={title}>
          {title}
        </span>
        <span className="cart-items__item-total-price">
          {formatPrice(totalPrice.toString())}
        </span>
      </div>
      <div className="cart-items__item-actions">
        <span className="cart-items__item-quantity">
          Total: {quantity}
        </span>
        <Tooltip title={`Add one more ${title}`} aria-label={`Add one more ${title}`}>
          <span>
            <IconButton size="small">
              <AddIcon fontSize="small" color="action" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={`Remove one ${title}`} aria-label={`Remove one ${title}`}>
          <span>
            <IconButton size="small">
              <RemoveIcon fontSize="small" color="action" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={`Remove ${title} from list`} aria-label={`Remove ${title} from list`}>
          <span>
            <IconButton size="small">
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
          </span>
        </Tooltip>
      </div>
    </div>
  );
}

function CartPopover({ items, anchorEl, isOpen, onClose, onChange }: CartPopoverProps) {
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
        {items.length > 0
          ? (
            items.map(item => (
              <CartItem key={item.uuid} {...item} />
            ))
          ) : (
            <span>There are no items on cart</span>
          )
        }
      </div>
    </Popover>
  );
};

function CartItems({ items, onChange }: CartItemsProps) {
  const [anchorEl, setAnchorEl] = useState<Element>();
  const totalItems = items.length;
  const isPopoverOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(undefined);
  };

  return (
    <>
      <Badge
        badgeContent={totalItems}
        overlap="circular"
      >
        <IconButton
          aria-label="Open Cart"
          onClick={handleClick}
        >
          <ShoppingCartIcon />
        </IconButton>
      </Badge>
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
  items: []
});

export default CartItems;