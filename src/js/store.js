import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Answer } from './answers';
import data from '../poke.json';

const initialStore = {
    pokemon: data,
    question: {
        "current": null,
        "count": 0
    },
    won: false,
    wonText: null,
    askWings: false,
    askLegendary: false,
    askMega: false
};

function reducer(state, answer) {
    if (answer.type === Answer.Restart) {
        return {
            ...state,
            pokemon: data,
            question: randomQuestion(null, data),
            won: false,
            wonText: null,
            askWings: false,
            askLegendary: false,
            askMega: false
        };
    }
    if (state.pokemon.length === 0) {
        return {
            ...state,
            won: true,
            wonText: "I couldn't get it in " + state.question.count + " guesses!"
        }
    }
    var bool = answer.type === Answer.True ? true : false;
    var newPoke;
    switch (state.question.current) {
        case ("w"):
            newPoke = state.pokemon.filter(p => p.wings === bool);
            break;
        case ("m"):
            newPoke = state.pokemon.filter(p => p.mega === bool);
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
            break;
        case ("n"):
            newPoke = state.pokemon.filter(p => (p.stage === state.question.param) === bool);
            break;
        case ("e"):
            newPoke = state.pokemon.filter(p => (p.evolve === state.question.param) === bool);
            break;
        case ("p"):
            if (bool) {
                return {
                    ...state,
                    won: true,
                    wonText: "Got it in " + state.question.count + " guesses!"
                };
            } else {
                newPoke = state.pokemon.filter(p => (p.name !== state.question.param.name));
                return {
                    ...state,
                    pokemon: newPoke,
                    question: randomQuestion(state.question, newPoke)
                };
            }
        default:
            return {
                ...state,
                question: randomQuestion(null, data)
            }
    }
    console.log(newPoke);
    if (checkZero(state, newPoke)) {
        return state;
    }
    if (bool) state.question.list = state.question.list.filter(i => i !== state.question.current);
    return {
        ...state,
        pokemon: newPoke,
        question: randomQuestion(state.question, newPoke)
    };
}

function checkZero(q, p) {
    if (p.length === 0) {
        q.won = true;
        q.wonText = "I couldn't get it in " + q.question.count + " guesses!";
        return true;
    } return false;
}

function guessPoke(newQ, p) {
    newQ.count++;
    newQ.current = "p";
    newQ.param = p[Math.floor(Math.random() * p.length)];
    newQ.text = newQ.count + ". Is it " + newQ.param.name + "?";
    return newQ;
}

export function randomQuestion(q, p) {
    var newQ = q;
    if (q == null) {
        newQ = {
            "count": 0,
            "list": ["l", "c", "t", "n", "e"],
            "text": null,
            "param": null,
            "current": null,
            "aColors": ["red", "pink", "yellow", "blue", "brown", "purple", "green", "gray", "white"],
            "aStages": [1, 2, 3],
            "aTypes": ["grass", "bug", "dragon", "poison", "fire", "water", "flying", "ice",
                "ground", "rock", "normal", "psychic", "ghost", "fighting", "electric"],
            "aLegs": [0, 2, 4],
            "aEvolve": ["level-up", "stone", "trade"]
        };
    }
    else if (checkZero(newQ, p)) {
        return newQ;
    }
    else if (p.length < 20 && (Math.floor(Math.random() * 10) === 2 || q.list.length < 2 || p.length < 4)) {
        return guessPoke(newQ, p);
    }
    var randPoke = p[Math.floor(Math.random() * p.length)];
    var randQuest;
    if (randPoke.wings && !newQ.askWings) {
        newQ.askWings = true;
        randQuest = "w";
    } else if (randPoke.legendary && !newQ.askLegendary) {
        newQ.askLegendary = true;
        randQuest = "s";
    } else if (randPoke.mega && !newQ.askMega) {
        newQ.askMega = true;
        randQuest = "m";
    } else do {
        randQuest = newQ.list[Math.floor(Math.random() * newQ.list.length)];
    } while (randQuest === "e" && randPoke.evolve == null);
    newQ.count++;
    newQ.current = randQuest;
    switch (randQuest) {
        case ("w"):
            newQ.text = newQ.count + ". Does the Pokemon have wings?";
            break;
        case ("s"):
            newQ.text = newQ.count + ". Is it a legendary Pokemon?";
            break;
        case ("m"):
            newQ.text = newQ.count + ". Does the Pokemon have a mega-evolution?";
            break;
        case ("l"):
            newQ.param = randPoke.legs;
            newQ.text = newQ.count + ". Does it have " + newQ.param + " legs/talons?";
            newQ.aLegs = newQ.aLegs.filter(item => item !== newQ.param);
            if (newQ.aLegs.length < 2) newQ.list = newQ.list.filter(item => item !== "l");
            break;
        case ("n"):
            newQ.param = randPoke.stage;
            newQ.text = newQ.count + ". Is it a stage " + newQ.param + " Pokemon?";
            newQ.aStages = newQ.aStages.filter(item => item !== newQ.param);
            if (newQ.aStages.length < 2) newQ.list = newQ.list.filter(item => item !== "n");
            break;
        case ("c"):
            newQ.param = randPoke.color;
            newQ.text = newQ.count + ". Is it a " + newQ.param + " Pokemon?";
            newQ.aColors = newQ.aColors.filter(item => item !== newQ.param);
            if (newQ.aColors.length < 2) newQ.list = newQ.list.filter(item => item !== "c");
            break;
        case ("t"):
            newQ.param = randPoke.type[Math.floor(Math.random() * randPoke.type.length)];
            newQ.text = newQ.count + ". Is it " + newQ.param + "-type?";
            newQ.aTypes = newQ.aTypes.filter(item => item !== newQ.param);
            if (newQ.aTypes.length < 2) newQ.list = newQ.list.filter(item => item !== "t");
            break;
        case ("e"):
            newQ.param = randPoke.evolve;
            newQ.text = newQ.count + ". Does the Pokemon evolve by " + newQ.param + "?";
            newQ.aEvolve = newQ.aEvolve.filter(item => item !== newQ.param);
            if (newQ.aTypes.length < 2) newQ.list = newQ.list.filter(item => item !== "e");
            break;
        default:
            break;
    }
    console.log(newQ);
    return newQ;
}

export const store = createStore(reducer, initialStore, applyMiddleware(thunk));