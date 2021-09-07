import Logo from '../../assets/logo.jpg';
import './Header.scss';

interface HeaderProps {
  actions?: JSX.Element;
  logoSrc?: string;
  logoLabel?: string;
}

function Header({ actions, logoSrc, logoLabel }: HeaderProps): JSX.Element {
  return (
    <header className="header">
      {logoSrc && <img className="header__logo" src={logoSrc} aria-label={logoLabel} />}
      {actions && <div className="header__actions">{actions}</div>}
    </header>
  );
}

Header.defaultProps = Object.freeze({
  logoSrc: Logo,
  logoLabel: 'A logo using a camera as background',
});

export default Header;
