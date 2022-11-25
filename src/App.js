import logo from './logo.svg';
import './App.css';
import Home from "./pages/Home";
import AppContextProvider from './contexts/AppContextProvider';

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <Home/>
      </div>
    </AppContextProvider>
  );
}

export default App

