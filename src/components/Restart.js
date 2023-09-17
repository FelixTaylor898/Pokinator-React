import './../css/Buttons.css';
import './../css/App.css';
import { Fragment } from 'react';
import { restart } from '../js/answers';
import { useDispatch } from 'react-redux'

export function Restart() {
    var dispatch = useDispatch();
    return (
        <Fragment>
            <div class="flex-container">
                <button class="b" onClick={() => dispatch(restart())}>Restart</button>
            </div>
        </Fragment>
    );
}

export default Restart;