import PropTypes from 'prop-types';
import './Result.scss';

function Result(props) {
  const { votes } = props;
  const totalCount = votes.reduce((acc, { count }) => acc + count, 0);

  const getVotePercentage = (votesCount) => `${((votesCount / totalCount) * 100).toFixed(0)}%`;

  return (
    <div className="result">
      <ol className="result__list">
        {votes.map((vote) => (
          <li key={vote.option} className="result__list-item">
            {`${vote.option} - ${vote.count} votes (${getVotePercentage(vote.count)})`}
          </li>
        ))}
      </ol>
    </div>
  );
}

Result.propTypes = {
  votes: PropTypes.arrayOf(PropTypes.shape({
    option: PropTypes.string,
    count: PropTypes.number,
  })),
};

Result.defaultProps = {
  votes: [],
};

export default Result;
