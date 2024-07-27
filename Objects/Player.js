/**
 * @doc Class Player
 * @namespace Entities
 * @class Player
 * @summary This class represents a player entity with basic physics and input handling.
 * @Date 26/07/2024
 * @example
 *  const player = new Player(50, 50);
 * @returns {void}
 */

import { GameObject } from "../Framework/Root/GameObject.js";
import { Vector2D } from "../Framework/Math/Vector2D.js";
import { Input } from "../Framework/Input/Input.js";
import { KeyCode } from "../Framework/Input/KeyCode.js";
import { Draw } from "../Framework/Graphic/Draw.js";

export class Player extends GameObject {
    constructor(screen, x, y) {
        super();
        this.position = new Vector2D(x, y);
        this.size = new Vector2D(32, 32);
        this.velocity = new Vector2D(0, 0);
        this.hasGravity = true; // Indicates that this entity is affected by gravity
        this.name = "Player";
        this.speed = 200; // Movement speed

        // Graphic settings
        this.draw = new Draw(screen);
    }

    OnStart() {
        console.log("Player started at position:", this.position);
    }

    OnUpdate() {}

    OnFixedUpdate(deltaTime) {
        // Handle player input and other updates
        this.HandleInput(deltaTime);
        
        // Handle physics updates
        // if (this.hasGravity) {
        //     this.velocity.y += this.gravity * deltaTime; // Apply gravity
        //     this.position.y += this.velocity.y * deltaTime; // Update position
        // }
    }

    // Draws using global cordinates
    OnDrawn() {
        // Draw the player (pseudo code)
        this.draw.Color = "blue";
        this.draw.DrawRect(this.position.x, this.position.y, this.size.x, this.size.y)
        this.draw.Color = "white";
    }

    // Draw using local cordinates
    OnGUI() {
        // Draw any GUI elements related to the player
        this.draw.Color = "white";
        let _xx = this.position.x;
        let _yy = this.position.y;
        this.draw.DrawText(`x: ${_xx.toFixed(0)}, y: ${_yy.toFixed(0)}`, 16, 16);
    }

    HandleInput(deltaTime) {
        // Example: basic left/right movement
        if (Input.GetKey(KeyCode.A)) {
            this.position.x -= this.speed * deltaTime;
        }
        if (Input.GetKey(KeyCode.D)) {
            this.position.x += this.speed * deltaTime;
        }
        if (Input.GetKey(KeyCode.W)) {
            this.position.y -= this.speed * deltaTime;
        }
        if (Input.GetKey(KeyCode.S)) {
            this.position.y += this.speed * deltaTime;
        }
    }
}
