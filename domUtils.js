class DOMQueryError extends Error {
	/** @param {string} message */
	constructor(message) {
		super(message);
		this.name = "DOMQueryError";
	}
}

class DOMTypeError extends Error {
	/** @param {string} message */
	constructor(message) {
		super(message);
		this.name = "DOMTypeError";
	}
}



/**
 * @template T should be a subclass of HTMLElement
 * @param {string} selector 
 * @param {{ new (): T }} typeInstance 
 * @returns {T}
 */
export function querySelector_s(selector, typeInstance) {
    const element = document.querySelector(selector);
	
    if (element === null) {
        throw new DOMQueryError(`Cannot find element by selector: "${selector}"`);
    }
	if (!(element instanceof typeInstance)) {
		throw new DOMTypeError(`"${selector}": Expected <${typeInstance.name}>, but <${element.constructor.name}>`);
	}

    return element;
}