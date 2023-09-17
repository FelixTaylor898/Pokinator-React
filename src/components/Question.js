import './../css/App.css';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

export function Question() {
    const text = useSelector(state => state.question.text);
  return (
    <Fragment>
        <p>{text}</p>
    </Fragment>
  );
}

export default Question;