import { useState } from "react";
import { Badge, IconButton, Popover, Tooltip } from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import { ICartItem } from "../interfaces";
import './CartItems.scss';
import { formatPrice } from "../common";

type CartAction = 'add' | 'remove' | 'delete';

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
  const handleClick = (action: CartAction) => () => {
    if (onChange) onChange(action, uuid);
  }

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
        <Tooltip title={`Delete ${title} from list`}>
          <span>
            <IconButton
              size="small"
              aria-label={`Delete ${title} from list`}
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
              <CartItem key={item.uuid} onChange={onChange} {...item} />
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