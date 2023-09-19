import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Answer } from './answers';
import data from '../poke.json';
import { removeItem, checkZero, guessPoke, editSpecial, editTypical } from "./util";

const initialStore = {
    pokemon: data,
    question: {
        "current": null,
        "count": 0
    },
    guessed: []
};

function reducer(state, answer) {
    if (answer.type === Answer.IDK) {
        return {
            ...state,
            question: randomQuestion(state.question, state.pokemon),
        };
    }
    if (answer.type === Answer.Restart) {
        return {
            ...state,
            pokemon: data,
            question: randomQuestion(null, data),
        };
    }
    let bool = answer.type === Answer.True ? true : false;
    var newPoke = state.pokemon;
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
            newPoke = state.pokemon.filter(p => p.color.includes(state.question.param) === bool);
            break;
        case ("t"):
            newPoke = state.pokemon.filter(p => p.type.includes(state.question.param) === bool);
            break;
        case ("b"):
            newPoke = state.pokemon.filter(p => p.baby === bool);
            break;
        case ("L"):
            newPoke = state.pokemon.filter(p => p.legendary === bool);
            break;
        case ("r"):
            newPoke = state.pokemon.filter(p => p.regional === bool);
            break;
        case ("s"):
            newPoke = state.pokemon.filter(p => p.starter === bool);
            break;
        case ("f"):
            newPoke = state.pokemon.filter(p => p.fossil === bool);
            break;
        case ("n"):
            newPoke = state.pokemon.filter(p => (p.stage === state.question.param) === bool);
            break;
        case ("g"):
            newPoke = state.pokemon.filter(p => (p.gen === state.question.param) === bool);
            break;
        case ("e"):
            state.pokemon.filter(p => p.evolve.includes(state.question.param) === bool);
            break;
        case ("p"):
            if (bool) {
                state.question.won = true;
                state.question.wonText = "Got it in " + state.question.count + " questions!";
                if (!state.guessed.includes(state.question.param.name)) state.guessed.push(state.question.param.name);
                return state;
            } else {
                removeItem(newPoke, state.question.param.name);
                state.question = randomQuestion(state.question, newPoke);
                return {
                    ...state,
                    pokemon: newPoke
                };
            }
        default:
            return {
                ...state,
                question: randomQuestion(null, data)
            }
    }
    console.log(newPoke);
    if (checkZero(state.question, newPoke)) {
        return state;
    }
    if (bool) removeItem(state.question.list, state.question.current);
    return {
        ...state,
        pokemon: newPoke,
        question: randomQuestion(state.question, newPoke)
    };
}

export function randomQuestion(q, p) {
    var newQ = q || {
        "count": 0,
        "list": ["l", "c", "t", "n", "e", "g"],
        "text": null,
        "param": null,
        "specialMap": {
            "askWings": false,
            "askBaby": false,
            "askFossil": false,
            "askStarter": false,
            "askLegendary": false,
            "askMega": false,
            "askRegional": false
        },
        "current": null,
        "aColors": ["red", "pink", "yellow", "blue", "brown", "purple", "green", "gray", "white", "black", "orange"],
        "aStages": [1, 2, 3],
        "aTypes": ["grass", "bug", "dragon", "poison", "fire", "water", "flying", "ice",
            "ground", "rock", "normal", "psychic", "ghost", "fighting", "electric", "dark", "steel", "fairy"],
        "aLegs": [0, 2, 4, 6],
        "aEvolve": ["level-up", "stone", "trade", "happiness"],
        "won": false,
        "wonText": null,
        "aGens": [1, 2, 3]
    };
    if (checkZero(newQ, p)) {
        return newQ;
    } if (newQ.list.length < 2 || p.length < 4) {
        return guessPoke(newQ, p);
    }
    newQ.count++;
    var randPoke = p[Math.floor(Math.random() * p.length)];
    newQ.current = null;
    if (!newQ.specialMap.askWings && randPoke.wings) {
        editSpecial("askWings", "Does the Pokemon have wings?", newQ, "w");
    } else if (!newQ.specialMap.askLegendary && randPoke.legendary) {
        editSpecial("askLegendary", "Is it a legendary Pokemon?", newQ, "L");
    } else if (!newQ.specialMap.askStarter && randPoke.starter) {
        editSpecial("askStarter", "Is it a starter Pokemon?", newQ, "s");
    } else if (!newQ.specialMap.askRegional && randPoke.regional) {
        editSpecial("askRegional", "Does the Pokemon have an alternate regional form?", newQ, "r");
    } else if (!newQ.specialMap.askMega && randPoke.mega) {
        editSpecial("askMega", "Does the Pokemon have a mega-evolution?", newQ, "m");
    } else if (!newQ.specialMap.askBaby && randPoke.baby) {
        editSpecial("askBaby", "Is it a baby Pokemon?", newQ, "b");
    } else if (!newQ.specialMap.askFossil && randPoke.fossil) {
        editSpecial("askFossil", "Is it a fossil Pokemon?", newQ, "f");
    } else do {
        newQ.current = newQ.list[Math.floor(Math.random() * newQ.list.length)];
    } while (newQ.current === "e" && randPoke.evolve.length === 0);
    switch (newQ.current) {
        case ("l"):
            editTypical("Does it stand on "+ randPoke.legs + " legs/talons?", randPoke.legs, "aLegs", newQ, "l")
            break;
        case ("n"):
            let stage = randPoke.color[Math.floor(Math.random() * randPoke.stage.length)];
            editTypical("Is it a stage "+ stage + " Pokemon?", stage, "aStages", newQ, "n")
            break;
        case ("g"):
            editTypical("Is it a gen "+ randPoke.gen + " Pokemon?", randPoke.gen, "aGens", newQ, "g")
            break;
        case ("c"):
            let color = randPoke.color[Math.floor(Math.random() * randPoke.color.length)];
            editTypical("Is it a(n) "+ color + " Pokemon?", color, "aColors", newQ, "c");
            break;
        case ("t"):
            let type = randPoke.type[Math.floor(Math.random() * randPoke.type.length)];
            editTypical("Is it a(n) "+ type + "-type Pokemon?", type, "aTypes", newQ, "t");
            break;
        case ("e"):
            let evolve = randPoke.evolve[Math.floor(Math.random() * randPoke.evolve.length)];
            editTypical("Does the Pokemon evolve by "+ evolve + "?", evolve, "aEvolve", newQ, "e");
            break;
        default:
            break;
    }
    console.log(newQ.text);
    console.log(newQ.param);
    console.log(randPoke);
    return newQ;
}

export const store = createStore(reducer, initialStore, applyMiddleware(thunk));