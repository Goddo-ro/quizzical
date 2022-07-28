import './App.css';
// import Question from './components/Question/Question';
import Starting from './components/Starting/Starting';
import blob5 from './images/blob5.png';
import blob51 from './images/blob5-1.png';

function App() {
  return (
    <div className="App">
      <img className="blob5" src={blob5} alt=""/>
      <img className="blob51" src={blob51} alt=""/>
      <Starting />
    </div>
  );
}

export default App;
