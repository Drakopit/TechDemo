/**
 * @doc Class GravityLevel
 * @namespace Template
 * @class GravityLevel
 * @summary This class extends the Level class to add gravity behavior.
 * @Date 26/07/2024
 * @example
 *  const gravityLevel = new GravityLevel();
 * @returns {void}
 */

import { Screen } from "../Framework/Window/Screen.js";
import { Draw } from "../Framework/Graphic/Draw.js";
import { Level } from "../Framework/Template/Level.js";
import { Player } from "../Objects/Player.js";

export class GravityLevel extends Level {
    constructor() {
        super();
        this.caption = "Gravity Level";
        this.gravity = 9.8; // gravity value
        this.screen = new Screen("GravityLevel", 640, 480);
        this.draw = new Draw(this.screen);
    }

    OnStart() {
        super.OnStart();

        // Create and add a player entity to the level
        const player = new Player(this.screen, 50, 50);
        player.CurrentLevel = this.LEVEL_HANDLER;
        this.AddEntity(player);
    }

    OnUpdate() { super.OnUpdate(); }

    OnFixedUpdate(deltaTime) {
        super.OnFixedUpdate(deltaTime);

        // Apply gravity to all entities
        // this.entities.forEach(entity => {
        //     if (entity.hasGravity) {
        //         entity.velocity.y += this.gravity * deltaTime; // Simple gravity effect
        //     }
        // });
        
        // // Update entities with physics simulation
        // this.entities.forEach(entity => {
        //     if (entity.hasGravity) {
        //         entity.position.y += entity.velocity.y * deltaTime;
        //     }
        // });
    }

    OnDrawn() {
        // Refresh screen
        this.screen.Refresh();

        // Update entities OnGUI
        super.OnDrawn();
    }

    OnGUI() {        
        // Update entities OnGUI
        super.OnGUI();
    }
}
