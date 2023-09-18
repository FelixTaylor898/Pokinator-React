import './../css/Guessed.css';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

export function Guessed() {
    const arr = useSelector(state => state.guessed);

    return (
        <Fragment>
            <div class="guess-container">
                {arr.map(item => <div key={item} class="guess"><p><strong>{item}</strong></p></div>)}
            </div>
        </Fragment>
    );
}

export default Guessed;