export function removeItem(arr, item) {
    const index = arr.indexOf(item);
    if (index > -1) {
      arr.splice(index, 1);
    }
}

export function checkZero(q, p) {
    if (p.length === 0) {
        q.won = true;
        q.wonText = "I couldn't get it in " + q.count + " questions!";
        return true;
    } return false;
}

export function guessPoke(newQ, p) {
    newQ.count++;
    newQ.current = "p";
    newQ.param = p.pop();
    newQ.text = newQ.count + ". Is it " + newQ.param.name + "?";
    return newQ;
}

export function editSpecial(name, info, question, curr) {
    question.specialMap[name] = true;
    question.text = question.count + ". " + info;
    question.current = curr;
}

export function editTypical(info, pokeParam, qParam, q, curr) {
    q.param = pokeParam;
    q.text = q.count + ". " + info;
    removeItem(q[qParam], pokeParam);
    if (q[qParam].length < 2) removeItem(q.list, curr);
}