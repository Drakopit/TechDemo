/**
 * @doc Class Util
 * @namespace Root
 * @class Util
 * @author Patrick Faustino Camello
 * @summary That class was made, to compose the EngineHtml5 framework.
 * @Date 15/05/2019
 * @example
 *  This is a static class, you can just use his functions 
 * @returns void
 */

export class Util {
	static OldUUIDv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	static NewUUIDv4() {
		return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
			(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
		)
	}

	/**
	 * @doc Function
	 * @description Selects a random element from an array.
	 * @param {Array} array - The array from which to choose an element.
	 * @example
	 *  const colors = ['red', 'green', 'blue'];
	 *  const randomColor = choose(colors);
	 *  console.log(randomColor); // Might log 'green'
	 * @returns {*} A randomly selected element from the array.
	 */
	static Choose(array) {
		if (!Array.isArray(array) || array.length === 0) {
			throw new Error("The input should be a non-empty array.");
		}
		const randomIndex = Math.floor(Math.random() * array.length);
		return array[randomIndex];
	}
}