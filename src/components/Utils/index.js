export const findMentionQueryStart = (text, pos) => {
    let i = pos - 1;
    while (i >= 0 && isValidUserIDChar(text[i])) {
        i--;
    }

    if (i < 0) return null;

    if (text[i] === '@'){
        return i + 1
    }
    return null;
}

export const findMentionQueryEnd = (text, start) => {
    let i = start;
    while (i < text.length && isValidUserIDChar(text[i])) {
        i++;
    }
    return i;
}

export const findMentionQuery = (text, start) => {
    const end = findMentionQueryEnd(text, start);
    return text.substring(start, end);
}

export const isValidUserIDChar =(char) => {
    return char.match(/[a-z]/i);
}

export const searchGithubUsers = (q) => {
    return fetch('https://api.github.com/search/users?q=' + q)
        .then(res => res.json())
        .then(json => json.items)
}

export const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
        let context = this, args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};