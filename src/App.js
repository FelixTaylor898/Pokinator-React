import './App.css';
import { Fragment } from 'react';
import { Question } from "./Question";
import { Buttons } from "./Buttons";
import { useSelector } from 'react-redux';

function App() {
  const won = useSelector(state => state.won);
  return (
    <Fragment>
      {!won && <div class="flex">
        <Question />
        <Buttons />
      </div>}
      {won && <p>Guessed the Pokemon!</p>}
    </Fragment>
  );
}

export default App;