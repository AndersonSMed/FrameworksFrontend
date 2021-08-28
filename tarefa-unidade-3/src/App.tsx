import './reset.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './routes';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
