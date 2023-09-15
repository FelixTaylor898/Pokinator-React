import './Buttons.css';
import { Fragment } from 'react';
import { answerTrue, answerFalse } from './answers';
import { useDispatch } from 'react-redux'

export function Buttons() {
    var dispatch = useDispatch();
    return (
        <Fragment>
            <div>
                <button onClick={() => dispatch(answerTrue())}>Yes</button>
                <button onClick={() => dispatch(answerFalse())}>No</button>
            </div>
        </Fragment>
    );
}

export default Buttons;