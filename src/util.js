export function fixCapitalization(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const shuffle = array => { 
    return array.sort(() => Math.random() - 0.5); 
}; 