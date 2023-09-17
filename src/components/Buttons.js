import './../css/Buttons.css';
import './../css/App.css';
import { Fragment } from 'react';
import { answerTrue, answerFalse, answerIDK } from '../js/answers';
import { useDispatch } from 'react-redux'

export function Buttons() {
    var dispatch = useDispatch();
    return (
        <Fragment>
            <div class="flex-container">
                <button class="b" onClick={() => dispatch(answerTrue())}>Yes</button>
                <button class="b" onClick={() => dispatch(answerFalse())}>No</button>
                <button class="b" onClick={() => dispatch(answerIDK())}>Skip</button>

            </div>
        </Fragment>
    );
}

export default Buttons;