// src/Input/Touch.js
import { Vector2D } from "../Math/Vector2D.js";

/**
 * @doc Class Touch
 * @namespace Input
 * @class Touch
 * @summary Manages touch input for the game framework.
 * @Date 15/05/2019
 * @example
 * const touch = new Touch();
 * // Touch event listeners are automatically added
 * @returns {Object}
 */
export class Touch {
    constructor() {
        this.touchStartPosition = new Vector2D(0, 0);
        this.touchEndPosition = new Vector2D(0, 0);
        this.touchPosition = new Vector2D(0, 0);
        this.touchActive = false;

        this.touchStartHandler = this.touchStartHandler.bind(this);
        this.touchEndHandler = this.touchEndHandler.bind(this);
        this.touchMoveHandler = this.touchMoveHandler.bind(this);

        window.addEventListener('touchstart', this.touchStartHandler);
        window.addEventListener('touchend', this.touchEndHandler);
        window.addEventListener('touchmove', this.touchMoveHandler);
    }

    touchStartHandler(event) {
        const touch = event.touches[0];
        this.touchStartPosition.x = touch.clientX;
        this.touchStartPosition.y = touch.clientY;
        this.touchActive = true;
    }

    touchEndHandler(event) {
        const touch = event.changedTouches[0];
        this.touchEndPosition.x = touch.clientX;
        this.touchEndPosition.y = touch.clientY;
        this.touchActive = false;
    }

    touchMoveHandler(event) {
        const touch = event.touches[0];
        this.touchPosition.x = touch.clientX;
        this.touchPosition.y = touch.clientY;
    }

    getTouchStartPosition() {
        return this.touchStartPosition;
    }

    getTouchEndPosition() {
        return this.touchEndPosition;
    }

    getTouchPosition() {
        return this.touchPosition;
    }

    isTouchActive() {
        return this.touchActive;
    }
}
