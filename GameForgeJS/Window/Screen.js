/**
 * @doc Class Screen
 * @namespace Window
 * @class Screen
 * @author Patrick Faustino Camello
 * @summary That class was made, to compose the EngineHtml5 framework.
 * @Date 15/05/2019
 * @example
 *  var screen = new Screen(0, 320, 240);
 * @returns {Object}
 */

import { Vector2D } from "../Math/Vector2D.js";

export class Screen {
    constructor(id, width, height) {
		this.id = id;
		this.ratio = width/height;
		if (width !== undefined && height !== undefined) {
            this.width = width * this.ratio;
			this.height = height * this.ratio;
		} else {
			this.width = window.innerWidth * this.ratio;
			this.height = window.innerHeight * this.ratio;
		}
        this.clientWidth = window.innerWidth;
        this.clientHeight = window.innerHeight;
		this.x = 0; this.y = 0;

        // Inicializa a tela
        this.Init(this.id);
    }

    /**
     * @doc Method
     * @description Get canvas of the screen
     * @example
     *  var newCanvas = screen.Canvas();
     * @returns canvas
     */
    get Canvas() { return this.canvas; }

    /**
     * @doc Method
     * @description Set new canvas
     * @example
     * var canvas = document.getElementById("canvasName")
     *  screen.Canvas(canvas)
     */
    set Canvas(canvas) { this.canvas = canvas; }
    
    /**
     * @doc Method
     * @description Get context of the screen
     * @example
     *  var newContext = screen.Context();
     * @returns context
     */
    get Context() { return this.context; }

    /**
     * @doc Method
     * @description Set new context
     * @example
     *  var context = document.getElementById("canvasName").getContext("typeContext");
     *  screen.Context(context);
     */
    set Context(context) { this.context = context; }

    /**
     * @doc Method
     * @description Get screen id
     * @example
     *  var id = screen.ScreenId();
     * @returns number
     */
    get ScreenId() { return this.id; }

    /**
     * @doc Method
     * @description Initialize scene
     * @param {canvas} canvas 
     * @param {context} context
     * @example
     *  var canvas = document.getElementById("canvasName");
     *  var context= canvas.getContext('2d');     
     *  screen.Init(canvas, context);
     */
    Init(screenName) {
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.canvas.setAttribute("id", screenName);
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);
		this.context = this.canvas.getContext("2d");
    }

    /**
     * @doc Method
     * @description return canvas width
     * @example
     *  var width = screen.Width();
     * @returns number
     */
    get Width() { return this.canvas.width; }
    
    /**
     * @doc Method
     * @description returns canvas height
     * @example
     *  var width = screen.Height();
     * @returns number
     */
    get Height() { return this.canvas.height; }

    /**
     * @doc Method
     * @description Return size screen
     * @example
     * var size = screen.GetSize();
     * @returns Vector2D
     */
    GetSize() {
        return new Vector2D(this.Width, this.Height);
    }

    /**
     * @doc Method
     * @description Return size window browser
     * @example
     * var windowSize = GetwindowSize();
     * @returns Vector2D
     */
    GetwindowSize() {
        return new Vector2D(this.clientWidth, this.clientHeight);
    }

    Refresh() {
        this.Context.clearRect(0, 0, this.Width, this.Height);
    }

    /**
     * @doc Method
     * @param {width} width 
     * @param {height} height
     * @description Resize screen
     * @example
     *  screen.Resize(640, 480);
     */
    Resize(width, height) {
        // this.width = vector2D.GetValue().x;
        // this.height = vector2D.GetValue().y;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    /**
     * @doc Method
     * @description Get position screen
     * @example
     *  var position = screen.Position();
     * @returns Vector2D
     */
    get Position() { return new Vector2D(this.x, this.y); }
}

Screen.prototype.MDC = function(width, height) {
    return (height == 0) ? width : this.MDC(height, width%height);
};
