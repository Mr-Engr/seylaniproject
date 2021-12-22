import logo from './logo.svg';
import './App.css';
import Routes from './configs/Routes';
import ContextProvider from './context/context';

function App() {
  return (
    <ContextProvider>
    <Routes />
    </ContextProvider>
  );
}

export default App;
