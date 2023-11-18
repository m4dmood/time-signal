import './App.css';
import Signal from './components/signal/Signal';
import Clock from './components/clock/Clock';

function App() {
  return (
    <div className="container">
      <header className="title">SEGNALE ORARIO</header>
      <Clock></Clock>
      <Signal></Signal>
    </div>
  );
}

export default App;
