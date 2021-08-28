import './ErrorMessage.scss';

export interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-message">
      {message}
    </div>
  );
}

ErrorMessage.defaultProps = Object.freeze({
  message: ''
});

export default ErrorMessage;
