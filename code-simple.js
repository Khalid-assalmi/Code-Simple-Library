// This Code Is Open Sourse.

/*
---------------------------------
    CodeSimple Library 0.0.3v
---------------------------------

The Goals:
    1. Facilitation code writing.
    2. Providing a lot of shortcuts in code.
    3. Making coding faster.
    4. Code Oragnization in one page.
    5. Working with API server in writing a very simpe codes.
*/

// Deboune doing any function.
export function debounce(fn, del) {
    let timer = null;

    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, del);
    }
}

/*
    Functions For get HTML DOM.
*/

export function $(id) {
    return document.getElementById(id);
}

export function getClass(class_name) {
    return document.querySelector(`.${class_name}`);
}

export function getClassAll(class_name) {
    return document.querySelectorAll(`.${class_name}`);
}

export function create(element) {
    return document.createElement(element);
}

export function addClass(element, class_name) {
    element.classList.add(class_name);
}

export function removeClass(element, class_name) {
    element.classList.remove(class_name);
}

/*
    Functions for arrays.
*/

export function getRandom(array) {
    let arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);

    let index =  arr[0] % array.length;
    return array[index];
}

/*
    Server Functions.
*/

export class Server {

    async post(url, data) {
        try {
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    async get(url) {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Error: Not Found ${res.status}`);
            }
            const result = await res.json();
            if (result && typeof result == "object" && !Array.isArray(result)) {
                return Object.values(result);
                }
            return result || [];
        } catch (err) {
            console.error(err);
            return null;
        }
    }

}



// Write HTML code in JS File.
export function returnHTML(HTMLelements) {
    let htmlCon = create("section");
    htmlCon.innerHTML = HTMLelements;
    document.body.appendChild(htmlCon);
}

// Class for facilitation write HTML elements.
export function render(elementsContainer, array, templateFn, emptyMessege) {
    if (!elementsContainer || !array) return;
    if (!Array.isArray(array)) array = Object.values(array);
    if (array.length == 0 && emptyMessege) {
        elementsContainer.innerHTML = emptyMessege;
        return;
    } else if (array.length == 0 && !emptyMessege) return;

    let htmlList = array.map((item, index) => templateFn(item, index)).join("");

    elementsContainer.innerHTML = htmlList;
}

class CodeSimple {

    constructor() {
        this.getVarType = null;
    }

    // Clear text and unit it for use it for simple.
    clearText(text) {
        text = text.toLowerCase().trim();
        text = text.replaceAll("ة", "ه");
        text = text.replaceAll("ي", "ى");
        text = text.replaceAll("أ", "ا");
        text = text.replaceAll("إ", "ا");
        text = text.replaceAll("آ", "ا");
        return text;
    }

    /*
        Functions for Local Storage with JSON.
    */

    getStorage(name) {
        let data = JSON.parse(localStorage.getItem(name)) || [];
        return data;
    }

    setStorage(name, array) {
        localStorage.setItem(name, JSON.stringify(array));
    }

    removeStorage(name) {
        localStorage.removeItem(name);
    }

    // Function to Copy text to Clipboard.
    copyText(text) {
        navigator.clipboard.writeText(text);
    }

}

export default CodeSimple;