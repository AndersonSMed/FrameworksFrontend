import { IconButton } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.jpg';
import { CartItems, Header } from '../../components';

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
  return (
    <>
      <Header
        logoLabel="A logo using a camera as background"
        logoSrc={Logo}
        actions={<HeaderActions />}
      />
    </>
  );
}

export default Home;
