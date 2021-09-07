import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, TextField, Tooltip } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ClearIcon from '@material-ui/icons/Clear';
import { Link } from 'react-router-dom';
import { CartItems, Header, ProductList } from '../../components';
import { loadHomeProducts } from '../../store/thunks/homeThunk';
import { RootState } from '../../store';
import './Home.scss';
import {
  addProductToCart,
  deleteProductFromCart,
  filterProducts,
  removeProductFromCart,
} from '../../store/slices/homeSlice';
import { TCartAction } from '../../interfaces';

function HeaderActions() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.home);

  const handleAddProductToCart = (productId: string) => {
    dispatch(addProductToCart(productId));
  };

  const handleRemoveProductFromCart = (productId: string) => {
    dispatch(removeProductFromCart(productId));
  };

  const handleDeleteProductFromCart = (productId: string) => {
    dispatch(deleteProductFromCart(productId));
  };

  const handleCartChange = (actionName: TCartAction, productId: string) => {
    switch (actionName) {
      case 'add':
        handleAddProductToCart(productId);
        break;
      case 'remove':
        handleRemoveProductFromCart(productId);
        break;
      case 'delete':
        handleDeleteProductFromCart(productId);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Tooltip title="Go to admin page">
        <Link to="/admin">
          <IconButton type="button" aria-label="Go to admin page">
            <PersonIcon />
          </IconButton>
        </Link>
      </Tooltip>
      <CartItems items={cartItems} onChange={handleCartChange} />
    </>
  );
}

function LateralBar() {
  const [searchValue, setSearchValue] = useState<string>('');
  const dispatch = useDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClearButton = () => {
    setSearchValue('');
  };

  useEffect(() => {
    dispatch(filterProducts(searchValue));
  }, [searchValue]);

  return (
    <div className="home__lateral-bar">
      <div className="home__lateral-bar-search-container">
        <TextField
          placeholder="Search for product"
          variant="outlined"
          value={searchValue}
          onChange={handleInputChange}
        />
        <Tooltip title="Clear Search Field">
          <span>
            <IconButton aria-label="Clear Search Field" onClick={handleClearButton}>
              <ClearIcon fontSize="medium" />
            </IconButton>
          </span>
        </Tooltip>
      </div>
    </div>
  );
}

function Home(): JSX.Element {
  const dispatch = useDispatch();
  const { filteredProducts, isLoading } = useSelector((state: RootState) => state.home);

  useEffect(() => {
    dispatch(loadHomeProducts());
  }, []);

  const handleAddToCart = (productId: string) => {
    dispatch(addProductToCart(productId));
  };

  return (
    <div className="home">
      <Header actions={<HeaderActions />} />
      <main className="home__main">
        <LateralBar />
        <ProductList items={filteredProducts} isLoading={isLoading} onAddToCart={handleAddToCart} />
      </main>
    </div>
  );
}

export default Home;
