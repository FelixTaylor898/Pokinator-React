import './../css/App.css';
import { Fragment } from 'react';
import { Question } from "./Question";
import { Buttons } from "./Buttons";
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Restart } from './Restart';
import { Guessed } from './Guessed';

function App() {
  const won = useSelector(state => state.question.won);
  const text = useSelector(state => state.question.wonText);
  return (
    <Fragment>
      <Helmet bodyAttributes={{ style: 'background-color : red' }} />
      <div class="major-div">
        <div class="flex-container">
          {!won && <div class="game">
            <p><strong>Pokemon Guessing Game</strong> (Gens 1-2)</p>
            <Question />
            <Buttons />
          </div>}
          {won && <div class="game">
            <p><strong>Pokemon Guessing Game</strong></p>
            <p>{text}</p>
            <Restart />
          </div>}
          </div>
          <Guessed />
        </div>
    </Fragment>
  );
}

export default App;