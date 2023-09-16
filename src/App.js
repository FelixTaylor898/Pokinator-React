import './App.css';
import { Fragment } from 'react';
import { Question } from "./Question";
import { Buttons } from "./Buttons";
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Restart } from './Restart';

function App() {
  const won = useSelector(state => state.won);
  const text = useSelector(state => state.wonText);
  return (
    <Fragment>
      <Helmet bodyAttributes={{ style: 'background-color : red' }} />
      <div class="flex-container">
        {!won && <div class="game">
          <p><strong>Pokemon Guessing Game</strong></p>
          <Question />
          <Buttons />
        </div>}
        {won && <div class="game">
          <p><strong>Pokemon Guessing Game</strong></p>
          <p>{text}</p>
          <Restart />
        </div>}
      </div>
    </Fragment>
  );
}

export default App;