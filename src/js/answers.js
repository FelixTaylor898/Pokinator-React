export const Answer = Object.freeze({
    True: 'True',
    False: 'False',
    Restart: 'Restart',
    IDK: 'IDK'
});

export function answerTrue() {
    return { type : Answer.True };
}

export function answerIDK() {
    return { type: Answer.IDK };
}

export function answerFalse() {
    return { type : Answer.False };
}

export function restart() {
    return {type : Answer.Restart};
}