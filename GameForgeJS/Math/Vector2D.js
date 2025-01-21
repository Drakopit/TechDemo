/**
 * @doc Class Vector2D
 * @namespace Math
 * @class Vector2D
 * @author Patrick Faustino Camello
 * @summary That class was made, to compose the EngineHtml5 framework.
 * @Date 15/05/2019
 * @example
 *  var vector2D = new Vector2D(0, 0);
 * @returns {Object}
 */

export class Vector2D {
    constructor(x, y) {
        this.x = (x != undefined) ? x : 0;
        this.y = (y != undefined) ? y : 0;
    }

    /**
     * @doc Method
     * @description Get value x and y of Vector
     * @example
     *  var position = vector2D.Value();
     * @returns {this.x && this.y}
     */
    GetValue() {
        return new Vector2D(this.x, this.y);
    }

    /**
     * @doc Method
     * @description Incres Vector value
     * @example
     *  vector2D.Add(x, y);
     * @returns {}
     */
    Add(vector) {
        return new Vector2D(this.x + vector.x, this.y + vector.y);
    }

    /**
     * @doc Method
     * @description Subtract Vector value
     * @example
     *  vector2D.Subtract(x, y);
     * @returns {}
     */
    Subtract(vector) {
        return new Vector2D(this.x - vector.x, this.y - vector.y);
    }

    /**
     * @doc Method
     * @description Scale Vector value
     * @example
     *  vector2D.Scale(x, y);
     * @returns {}
     */
    Scale(scalar) {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }
}