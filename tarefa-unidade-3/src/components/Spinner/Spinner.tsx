import './Spinner.scss';

function Spinner(): JSX.Element {
  return (
    <div className="spinner" role="img" aria-label="Loading">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export default Spinner;
