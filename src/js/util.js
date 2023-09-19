// Some utilities for the store.js file, put in their own file for code cleanliness

// remove a specific item from an array, if it exists
export function removeItem(arr, item) {
    const index = arr.indexOf(item);
    if (index > -1) arr.splice(index, 1);
}

// if p.length is zero, end the game and return true
// otherwise return false
export function checkZero(q, p) {
    if (p.length === 0) {
        q.won = true;
        q.wonText = "I couldn't get it in " + q.count + " questions!";
        return true;
    } return false;
}

// guess a specific pokemon
export function guessPoke(newQ, p) {
    newQ.count++;
    newQ.current = "p";
    newQ.param = p.pop();
    newQ.text = newQ.count + ". Is it " + newQ.param.name + "?";
    return newQ;
}

// edit the question to a special question
export function editSpecial(name, info, question, curr) {
    question.specialMap[name] = true;
    question.text = question.count + ". " + info;
    question.current = curr;
}

// edit the question to a typical question
export function editTypical(info, pokeParam, qParam, q, curr) {
    q.param = pokeParam;
    q.text = q.count + ". " + info;
    removeItem(q[qParam], pokeParam);
    if (q[qParam].length < 2) removeItem(q.list, curr);
}