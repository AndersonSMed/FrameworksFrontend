import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, TextField, Tooltip } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ClearIcon from '@material-ui/icons/Clear';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.jpg';
import { CartItems, Header, ProductList } from '../../components';
import { loadProducts } from '../../store/thunks/homeThunk';
import { RootState } from '../../store';
import './Home.scss';
import { filterProducts } from '../../store/slices/homeSlice';

function HeaderActions() {
  return (
    <>
      <Tooltip title="Go to admin page">
        <Link to="/admin">
          <IconButton type="button" aria-label="Go to admin page">
            <PersonIcon />
          </IconButton>
        </Link>
      </Tooltip>
      <CartItems />
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
  const products = useSelector((state: RootState) => state.home.filteredProducts);

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return (
    <div className="home">
      <Header
        logoLabel="A logo using a camera as background"
        logoSrc={Logo}
        actions={<HeaderActions />}
      />
      <main className="home__main">
        <LateralBar />
        <ProductList items={products} />
      </main>
    </div>
  );
}

export default Home;
