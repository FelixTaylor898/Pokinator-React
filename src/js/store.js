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
    // Skip the question: return the same state, but continue to the next question
    if (answer.type === Answer.IDK) {
        return {
            ...state,
            question: randomQuestion(state.question, state.pokemon),
        };
    }
    // Restart the game: go to the default settings, but keep the "guessed" list the same
    if (answer.type === Answer.Restart) {
        return {
            ...state,
            pokemon: data,
            question: randomQuestion(null, data),
        };
    }
    // Did the user answer yes or no?
    let bool = answer.type === Answer.True ? true : false;
    var newPoke = state.pokemon;
    switch (state.question.current) {
        case ("w"): // Does the pokemon have wings?
            newPoke = state.pokemon.filter(p => p.wings === bool);
            break;
        case ("m"): // Does the pokemon have a mega-evolution?
            newPoke = state.pokemon.filter(p => p.mega === bool);
            break;
        case ("l"): // How many legs does it have?
            newPoke = state.pokemon.filter(p => (p.legs === state.question.param) === bool);
            break;
        case ("c"): // What color is it?
            newPoke = state.pokemon.filter(p => p.color.includes(state.question.param) === bool);
            break;
        case ("t"): // What type is it?
            newPoke = state.pokemon.filter(p => p.type.includes(state.question.param) === bool);
            break;
        case ("b"): // Is it a baby pokemon?
            newPoke = state.pokemon.filter(p => p.baby === bool);
            break;
        case ("L"): // Is it a legendary pokemon?
            newPoke = state.pokemon.filter(p => p.legendary === bool);
            break;
        case ("r"): // Does it have a regional form?
            newPoke = state.pokemon.filter(p => p.regional === bool);
            break;
        case ("s"): // Is it a starter pokemon?
            newPoke = state.pokemon.filter(p => p.starter === bool);
            break;
        case ("f"): // Is it a fossil pokemon?
            newPoke = state.pokemon.filter(p => p.fossil === bool);
            break;
        case ("n"): // What stage is it?
            newPoke = state.pokemon.filter(p => (p.stage === state.question.param) === bool);
            break;
        case ("g"): // What generation is it?
            newPoke = state.pokemon.filter(p => (p.gen === state.question.param) === bool);
            break;
        case ("e"): // How does it evolve?
            newPoke = state.pokemon.filter(p => p.evolve.includes(state.question.param) === bool);
            break;
        case ("p"): // Is it x pokemon?
            if (bool) {
                state.question.won = true; // Won the game! Report how many guesses there have been
                state.question.wonText = "Got it in " + state.question.count + " questions!";
                if (!state.guessed.includes(state.question.param.name)) state.guessed.push(state.question.param.name);
                return state;
            } else { // Haven't won the game, continue asking
                removeItem(newPoke, state.question.param.name);
                state.question = randomQuestion(state.question, newPoke);
                return {
                    ...state,
                    pokemon: newPoke
                };
            }
        default: // default settings
            return {
                ...state,
                question: randomQuestion(null, data)
            }
    }
    if (checkZero(state.question, newPoke)) {
        return state; // If there are zero pokemon left, end the game
    }
    // if the answer to the question was yes, there is no more need to ask that question in any form
    if (bool) removeItem(state.question.list, state.question.current);
    return {
        ...state,
        pokemon: newPoke,
        question: randomQuestion(state.question, newPoke) // pick a new question
    };
}

export function randomQuestion(q, p) {
    // either use the existing question, or create a new default question
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
    if (checkZero(newQ, p)) return newQ; // Zero pokemon left, end the game
    if (newQ.list.length < 2 || p.length < 5) { 
        // The list has been narrowed down, now guess which pokemon it is
        return guessPoke(newQ, p);
    }
    newQ.count++;
    var randPoke = p[Math.floor(Math.random() * p.length)]; // select a random pokemon
    newQ.current = null;
    // if a question hasn't been asked and the pokemon fulfills the condition, ask the question
    if (!newQ.specialMap.askWings && randPoke.wings) {
        editSpecial("askWings", "Does the Pokemon have wings?", newQ, "w");
    } else if (!newQ.specialMap.askLegendary && randPoke.legendary) {
        editSpecial("askLegendary", "Is it a legendary Pokemon?", newQ, "L");
    } else if (!newQ.specialMap.askStarter && randPoke.starter) {
        editSpecial("askStarter", "Is it a starter Pokemon?", newQ, "s");
    } else if (!newQ.specialMap.askRegional && randPoke.regional) {
        editSpecial("askRegional", "Does the Pokemon have an alternate regional form?", newQ, "r");
    } else if (!newQ.specialMap.askMega && randPoke.mega) {
        editSpecial("askMega", "Does the Pokemon have a mega-evolution or primal form?", newQ, "m");
    } else if (!newQ.specialMap.askBaby && randPoke.baby) {
        editSpecial("askBaby", "Is it a baby Pokemon?", newQ, "b");
    } else if (!newQ.specialMap.askFossil && randPoke.fossil) {
        editSpecial("askFossil", "Is it a fossil Pokemon?", newQ, "f");
    } else do {
        // otherwise select a random other question, but not "evolve" if the pokemon doesn't evolve
        newQ.current = newQ.list[Math.floor(Math.random() * newQ.list.length)];
    } while (newQ.current === "e" && randPoke.evolve.length === 0);
    // proceed based on the typical question, if selected
    switch (newQ.current) {
        case ("l"):
            editTypical("Does it stand on "+ randPoke.legs + " legs/talons?", randPoke.legs, "aLegs", newQ, "l")
            break;
        case ("n"):
            editTypical("Is it a stage "+ randPoke.stage + " Pokemon?", randPoke.stage, "aStages", newQ, "n")
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
        default: // a special question was selected, do nothing
            break;
    }
    console.log(p);
    console.log(randPoke);
    console.log(newQ.text);
    console.log(newQ.param);
    return newQ;
}

export const store = createStore(reducer, initialStore, applyMiddleware(thunk));