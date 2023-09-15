import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Answer } from './answers';
import { fixCapitalization } from "./util";
import data from './poke.json';

const initialStore = {
    pokemon: data,
    question: {
        "current": null,
        "count": 0
    },
    won: false
};

function reducer(state, answer) {
    if (answer.type === Answer.Restart) {
        return {
            ...state,
            pokemon: data,
            question: randomQuestion(null, data),
            won: false
        };
    }
    var bool = answer.type === Answer.True ? true : false;
    var bool2 = false;
    var newPoke;
    switch (state.question.current) {
        case ("w"):
            newPoke = state.pokemon.filter(p => p.wings === bool);
            bool2 = true;
            break;
        case ("l"):
            newPoke = state.pokemon.filter(p => (p.legs === state.question.param) === bool);
            break;
        case ("c"):
            newPoke = state.pokemon.filter(p => (p.color === state.question.param) === bool);
            break;
        case ("t"):
            newPoke = state.pokemon.filter(p => p.type.includes(state.question.param) === bool);
            break;
        case ("s"):
            newPoke = state.pokemon.filter(p => p.legendary === bool);
            bool2 = true;
            break;
        case ("n"):
            newPoke = state.pokemon.filter(p => (p.stage === state.question.param) === bool);
            break;
        case ("p"):
            if (bool) {
                return {
                    ...state,
                    won: true
                };
            }
            newPoke = state.pokemon;
            break;
        default:
            return {
                ...state,
                question: randomQuestion(null, data)
            }
    }
    console.log(state.pokemon.length);
    console.log(state.pokemon);
    if (bool || bool2) state.question.list = state.question.list.filter(i => i !== state.question.current);
    return {
        ...state,
        pokemon: newPoke,
        question: randomQuestion(state.question, newPoke)
    };
}

export function randomQuestion(q, p) {
    var newQ;
    if (Math.floor(Math.random() * 6) === 2 || p.length < 4 || (q != null && q.list.length === 0)) {
        newQ = q;
        newQ.count++;
        newQ.current = "p";
        newQ.text = newQ.count + ". Is it " + fixCapitalization(p.pop().name) + "?";
        return newQ;
    }
    if (q == null) {
        newQ = {
            "count": 1,
            "list": ["w", "l", "c", "t", "s", "n"],
            "text": null,
            "param": null,
            "current": null,
            "aColors": ["red", "pink", "yellow", "blue", "brown", "purple", "green", "gray", "white"],
            "aStages": [1, 2, 3],
            "aTypes": ["grass", "bug", "dragon", "poison", "fire", "water", "flying", "ice",
                "ground", "rock", "normal", "psychic", "ghost", "fighting", "electric"],
            "aLegs": [0, 2, 4]
        };
    } else {
        newQ = q;
        newQ.count++;
    }
    var randPoke = p[Math.floor(Math.random() * p.length)];
    var randQuest = newQ.list[Math.floor(Math.random() * newQ.list.length)];
    newQ.current = randQuest;
    switch (randQuest) {
        case ("w"):
            newQ.text = newQ.count + ". Does the Pokemon have wings?";
            break;
        case ("s"):
            newQ.text = newQ.count + ". Is it a legendary Pokemon?";
            break;
        case ("l"):
            newQ.param = randPoke.legs;
            newQ.text = newQ.count + ". Does it have " + newQ.param + " legs?";
            newQ.aLegs = newQ.aLegs.filter(item => item !== newQ.param);
            if (newQ.aLegs.length === 1) newQ.list = newQ.list.filter(item => item !== "l");
            break;
        case ("n"):
            newQ.param = randPoke.stage;
            newQ.text = newQ.count + ". Is it a stage " + newQ.param + " Pokemon?";
            newQ.aStages = newQ.aStages.filter(item => item !== newQ.param);
            if (newQ.aStages.length === 1) newQ.list = newQ.list.filter(item => item !== "n");
            break;
        case ("c"):
            newQ.param = randPoke.color;
            newQ.text = newQ.count + ". Is it " + newQ.param + "?";
            newQ.aColors = newQ.aColors.filter(item => item !== newQ.param);
            if (newQ.aColors.length === 1) newQ.list = newQ.list.filter(item => item !== "c");
            break;
        case ("t"):
            newQ.param = randPoke.type[Math.floor(Math.random() * randPoke.type.length)];
            newQ.text = newQ.count + ". Is it " + newQ.param + " type?";
            newQ.aTypes = newQ.aTypes.filter(item => item !== newQ.param);
            if (newQ.aTypes.length === 1) newQ.list = newQ.list.filter(item => item !== "t");
            break;
        default:
            break;
    }
    console.log(newQ);
    return newQ;
}

export const store = createStore(reducer, initialStore, applyMiddleware(thunk));