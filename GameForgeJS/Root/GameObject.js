/**
 * @doc Class GameObjects
 * @namespace Root
 * @class GameObjects
 * @author Patrick Faustino Camello
 * @summary That class was made, to compose the EngineHtml5 framework.
 * @Date 15/05/2019
 * @example
 *  Is used to inheritance. Normaly to dynamic game objects 
 * @returns void
 */

import { Sprite } from "../Graphic/Sprite.js";
import { Vector2D } from "../Math/Vector2D.js";
import { Collide2D } from "../Math/Collide2D.js";
import { Base } from "./Base.js";
import { Util } from "./Utils.js";

export class GameObject extends Base {
    constructor() {
        super();
        this.id = Util.NewUUIDv4();
        this.hspeed = 64;
        this.vspeed = 64;
        this.solid = true;
        this.position = new Vector2D(0, 0);
        this.previousPosition = this.position;
        this.startPosition = this.position;
        this.size = new Vector2D(0, 0);
        this.direction = 90;
        this.friction = 0.5;
        this.gravity = 9.80665; // Força da gravidade
        this.gravityDirection = 180;
        this.depth = 0;
        this.danping = 0.5;
        this.mass = 0;
        
        this.sprite = new Sprite();

        this.Tag = "Entity";
        this.name = "Drako";

        // Current Level
        this.CurrentLevel = undefined;
    }

    OnCollision(other, callback) {
        if (other instanceof GameObject && Collide2D.isCollidingAABB(this, other)) {
            console.dir(this); console.dir(other);
            callback();
        }
    };

    // Método para corrigir a posição após a colisão
    ResolveCollision(other) {
        // Calcula as distâncias entre os lados dos objetos
        const dx = (this.position.x + this.size.x / 2) - (other.position.x + other.size.x / 2);
        const dy = (this.position.y + this.size.y / 2) - (other.position.y + other.size.y / 2);
        const width = (this.size.x + other.size.x) / 2;
        const height = (this.size.y + other.size.y) / 2;

        const crossWidth = width * dy;
        const crossHeight = height * dx;

        // Determina a direção da colisão
        if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
            if (crossWidth > crossHeight) {
                if (crossWidth > -crossHeight) {
                    this.position.y = other.position.y + other.size.y; // Colisão vinda de cima
                } else {
                    this.position.x = other.position.x - this.size.x; // Colisão vinda da direita
                }
            } else {
                if (crossWidth > -crossHeight) {
                    this.position.x = other.position.x + other.size.x; // Colisão vinda da esquerda
                } else {
                    this.position.y = other.position.y - this.size.y; // Colisão vinda de baixo
                }
            }
        }
    }
}