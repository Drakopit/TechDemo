/**
 * @doc Class Vector3D
 * @namespace Math
 * @class Vector3D
 * @author Patrick Faustino Camello
 * @summary That class was made, to compose the EngineHtml5 framework.
 * @Date 15/05/2019
 * @example
 *  var vector3D = new Vector3D(0, 0);
 * @returns {Object}
 */

export class Vector3D {
    constructor(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    /**
     * @doc Method
     * @description Get value x and y of Vector
     * @example
     *  var position = vector3D.Value();
     * @returns {this.x && this.y}
     */
    GetValue() {
        return new Vector3D(this.x, this.y, this.z);
    }

    /**
     * @doc Method
     * @description Incres Vector value
     * @example
     *  vector3D.Add(x, y);
     * @returns {}
     */
    Add(vector3D) {
        return new Vector3D(this.x + vector3D.x, this.y + vector3D.y, this.z + vector3D.z);
    }

    /**
     * @doc Method
     * @description Subtract Vector value
     * @example
     *  vector3D.Subtract(x, y);
     * @returns {}
     */
    Subtract(vector3D) {
        return new Vector3D(this.x - vector3D.x, this.y - vector3D.y, this.z - vector3D.z);
    }

    /**
     * @doc Method
     * @description Incres Vector value
     * @example
     *  vector3D.Scale(x, y);
     * @returns {}
     */
    Scale(vector3D) {
        return new Vector3D(this.x * vector3D.x, this.y * vector3D.y, this.z * vector3D.z);
    }
}