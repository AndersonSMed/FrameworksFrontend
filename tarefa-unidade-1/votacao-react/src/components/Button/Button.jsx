import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Button.scss';

function Button(props) {
  const { onClick, text, selected, disabled } = props;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames('btn', {
        'btn--selected': (selected && !disabled)
      })}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  selected: PropTypes.bool,
  disabled: PropTypes.bool
}

Button.defaultProps = {
  onClick: () => {},
  text: '',
  selected: false,
  disabled: false
}

export default Button;