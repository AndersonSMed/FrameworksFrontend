import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import VoteList from '../VoteList/VoteList';
import Result from '../Result/Result';
import './VotingCard.scss';

function VotingCard(props) {
  const { title, state, votes } = props;

  const isVotingEnabled = state === 'open';
  const votingOptions = votes.map((item) => item.option);

  const [currentVotes, setCurrentVotes] = useState(votes);

  useEffect(() => setCurrentVotes(votes), [votes]);

  const onVote = (selectedVote) => {
    setCurrentVotes((previousVotes) => previousVotes.map((item) => (item.option === selectedVote
      ? { ...item, count: item.count + 1 }
      : item)));
  };

  return (
    <div className="voting-card">
      {isVotingEnabled ? (
        <>
          <h3 className="voting-card__title">{title}</h3>
          <div className="voting-card__cabinet">
            <VoteList options={votingOptions} onVote={onVote} />
          </div>
        </>
      ) : (
        <Result votes={currentVotes} />
      )}
    </div>
  );
}

VotingCard.propTypes = {
  title: PropTypes.string,
  state: PropTypes.oneOf(['open', 'closed']),
  votes: PropTypes.arrayOf(PropTypes.shape({
    option: PropTypes.string,
    count: PropTypes.number,
  })),
};

VotingCard.defaultProps = {
  title: '',
  state: 'open',
  votes: [],
};

export default VotingCard;
