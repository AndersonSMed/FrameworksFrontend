import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button/Button';
import './VoteList.scss';

function VoteList(props) {
  const {
    options, display, disabled, onVote,
  } = props;

  const [selectedVote, setSelectedVote] = useState(null);

  const onSelectVote = (selectedOption) => () => {
    setSelectedVote(selectedOption);
    onVote(selectedOption);
  };

  return (
    <div className={classNames(
      'vote-list', {
        'vote-list--horizontal': display === 'horizontal',
        'vote-list--vertical': display === 'vertical',
      },
    )}
    >
      <ul className="vote-list__list">
        {options.map((option) => (
          <li key={option} className="vote-list__list-item">
            <Button
              text={option}
              onClick={onSelectVote(option)}
              disabled={disabled}
              selected={selectedVote === option}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

VoteList.propTypes = {
  disabled: PropTypes.bool,
  display: PropTypes.oneOf(['horizontal', 'vertical']),
  options: PropTypes.arrayOf(PropTypes.string),
  onVote: PropTypes.func,
};

VoteList.defaultProps = {
  disabled: false,
  display: 'horizontal',
  options: [],
  onVote: () => {},
};

export default VoteList;
