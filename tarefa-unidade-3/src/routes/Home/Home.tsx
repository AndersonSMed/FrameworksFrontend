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

// TODO: Create cart logic
function Home(): JSX.Element {
  const dispatch = useDispatch();
  const { filteredProducts, isLoading } = useSelector((state: RootState) => state.home);

  useEffect(() => {
    dispatch(loadHomeProducts());
  }, []);

  return (
    <div className="home">
      <Header actions={<HeaderActions />} />
      <main className="home__main">
        <LateralBar />
        <ProductList items={filteredProducts} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default Home;
