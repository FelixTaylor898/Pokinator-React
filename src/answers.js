export const Answer = Object.freeze({
    True: 'True',
    False: 'False',
});

export function answerTrue() {
    return { type : Answer.True };
}

export function answerFalse() {
    return { type : Answer.False };
}