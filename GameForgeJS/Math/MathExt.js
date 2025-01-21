import { Vector2D } from "./Vector2D.js";

/**
 * @doc Class MathExt
 * @namespace Math
 * @class MathExt
 * @author Patrick Faustino Camello
 * @summary Esta classe fornece métodos estáticos para operações matemáticas avançadas.
 * @Date 15/05/2019
 * @example
 * // Calculando a distância de Manhattan entre dois pontos
 * const dist = MathExt.ManhattanDistance(point1, point2);
 * console.log(dist);
 * @returns void
 */
export class MathExt {
    /**
     * @doc Method
     * @description Calcula a distância de Manhattan entre dois pontos.
     * @param {Object} p1 - O primeiro ponto, que deve ter uma propriedade `position` do tipo `Vector2D`.
     * @param {Object} p2 - O segundo ponto, que deve ter uma propriedade `position` do tipo `Vector2D`.
     * @returns {number} - A distância de Manhattan entre os dois pontos.
     * @example
     * const dist = MathExt.ManhattanDistance(point1, point2);
     * console.log(dist); // Exemplo de uso
     */
    static ManhattanDistance(p1, p2) {
        // Obtém as coordenadas dos pontos
        const x1 = p1.position.GetValue().x;
        const y1 = p1.position.GetValue().y;
        const x2 = p2.position.GetValue().x;
        const y2 = p2.position.GetValue().y;

        // Calcula a diferença absoluta nas coordenadas
        const distX = Math.abs(x1 - x2);
        const distY = Math.abs(y1 - y2);

        // Retorna a soma das diferenças
        return distX + distY;
    }

    /**
     * @doc Method
     * @description Calcula a distância euclidiana entre dois pontos.
     * @param {Object} p1 - O primeiro ponto, que deve ter uma propriedade `position` do tipo `Vector2D`.
     * @param {Object} p2 - O segundo ponto, que deve ter uma propriedade `position` do tipo `Vector2D`.
     * @returns {number} - A distância euclidiana entre os dois pontos.
     * @example
     * const dist = MathExt.Distance(point1, point2);
     * console.log(dist); // Exemplo de uso
     */
    static Distance(p1, p2) {
        const distX = p1.position.GetValue().x - p2.position.GetValue().x;
        const distY = p1.position.GetValue().y - p2.position.GetValue().y;
        return this.Module(Math.sqrt(distX * distX + distY * distY));
    }

    /**
     * @doc Method
     * @description Calcula a distância vetorial entre dois pontos.
     * @param {Object} p1 - O primeiro ponto, que deve ter uma propriedade `position` do tipo `Vector2D`.
     * @param {Object} p2 - O segundo ponto, que deve ter uma propriedade `position` do tipo `Vector2D`.
     * @returns {Vector2D} - Um objeto `Vector2D` representando as diferenças absolutas nas coordenadas x e y.
     * @example
     * const distVector = MathExt.DistanceVector(point1, point2);
     * console.log(distVector); // Exemplo de uso
     */
    static DistanceVector(p1, p2) {
        const distX = p1.position.GetValue().x - p2.position.GetValue().x;
        const distY = p1.position.GetValue().y - p2.position.GetValue().y;
        return new Vector2D(this.Module(distX), this.Module(distY));
    }

    /**
     * @doc Method
     * @description Calcula o valor absoluto de um número.
     * @param {number} value - O valor a ser calculado.
     * @returns {number} - O valor absoluto do número fornecido.
     * @example
     * const absValue = MathExt.Module(-5);
     * console.log(absValue); // Exemplo de uso
     */
    static Module(value) {
        return Math.abs(value);
    }
}
