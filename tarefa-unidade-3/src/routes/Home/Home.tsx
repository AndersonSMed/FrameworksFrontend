import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.jpg';
import { CartItems, Header, ProductList } from '../../components';
import { loadProducts } from '../../store/thunks/homeThunk';
import { RootState } from '../../store';

function HeaderActions() {
  return (
    <>
      <Link to="/admin">
        <IconButton type="button" aria-label="Go to admin page">
          <PersonIcon />
        </IconButton>
      </Link>
      <CartItems />
    </>
  );
}

function Home(): JSX.Element {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.home.products);

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return (
    <>
      <Header
        logoLabel="A logo using a camera as background"
        logoSrc={Logo}
        actions={<HeaderActions />}
      />
      <ProductList items={products} />
    </>
  );
}

export default Home;
