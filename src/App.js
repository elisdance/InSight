import Main from './components/Main/Main';
import './styles/App.scss';
import './i18n/index';
import {store} from './store/store';
import {Provider} from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Main />
      </Provider>
    </div>
  );
}

export default App;
