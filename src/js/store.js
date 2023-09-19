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
    guessed: []
};

function removeItem(arr, item) {
    const index = arr.indexOf(item);
    if (index > -1) {
      arr.splice(index, 1);
    }
}

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
    var newPoke;
    switch (state.question.current) {
        case ("w"):
            newPoke = state.pokemon.filter(p => p.wings === bool);
            break;
        case ("m"):
            newPoke = state.pokemon.filter(p => p.mega === bool);
            break;
        case ("l"):
            if(bool) removeItem(state.question.list, "l");
            newPoke = state.pokemon.filter(p => (p.legs === state.question.param) === bool);
            break;
        case ("c"):
            if(bool) removeItem(state.question.list, "c");
            newPoke = state.pokemon.filter(p => p.color.includes(state.question.param) === bool);
            break;
        case ("t"):
            if(bool) removeItem(state.question.list, "t");
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
            if(bool) removeItem(state.question.list, "n");
            newPoke = state.pokemon.filter(p => (p.stage === state.question.param) === bool);
            break;
        case ("g"):
            if(bool) removeItem(state.question.list, "g");
            newPoke = state.pokemon.filter(p => (p.gen === state.question.param) === bool);
            break;
        case ("e"):
            if(bool) removeItem(state.question.list, "e");
            newPoke = state.pokemon.filter(p => p.evolve.includes(state.question.param) === bool);
            break;
        case ("p"):
            if (bool) {
                state.question.won = true;
                state.question.wonText = "Got it in " + state.question.count + " questions!";
                if (!state.guessed.includes(state.question.param.name)) state.guessed.push(state.question.param.name);
                return state;
            } else {
                newPoke = state.pokemon.filter(p => (p.name !== state.question.param.name));
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
        q.wonText = "I couldn't get it in " + q.count + " questions!";
        return true;
    } return false;
}

function guessPoke(newQ, p) {
    var newnewQ = newQ;
    newnewQ.count++;
    newnewQ.current = "p";
    newnewQ.param = p.pop();
    newnewQ.text = newnewQ.count + ". Is it " + newnewQ.param.name + "?";
    return newnewQ;
}

function editSpecial(name, info, question, curr) {
    question.specialMap[name] = true;
    question.text = question.count + ". " + info;
    question.current = curr;
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
        case ("g"):
            newQ.param = randPoke.gen;
            newQ.text = newQ.count + ". Is it a gen " + newQ.param + " Pokemon?";
            newQ.aGens = newQ.aGens.filter(item => item !== newQ.param);
            if (newQ.aGens.length < 2) newQ.list = newQ.list.filter(item => item !== "g");
            break;
        case ("c"):
            newQ.param = randPoke.color[Math.floor(Math.random() * randPoke.color.length)];
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
            newQ.param = randPoke.evolve[Math.floor(Math.random() * randPoke.evolve.length)];
            newQ.text = newQ.count + ". Does the Pokemon evolve by " + newQ.param + "?";
            newQ.aEvolve = newQ.aEvolve.filter(item => item !== newQ.param);
            if (newQ.aEvolve.length < 2) newQ.list = newQ.list.filter(item => item !== "e");
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