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
import { Camera } from "../Framework/Root/Camera.js";
import { Player } from "../Objects/Player.js";
import { Vector2D } from "../Framework/Math/Vector2D.js";
import { Scene } from "../Framework/Root/Scene.js";

export class GravityLevel extends Level {
    constructor() {
        super();
        this.caption = "Gravity Level";
        this.gravity = 9.8; // gravity value
        this.screen = new Screen("GravityLevel", 640, 480);
        this.draw = new Draw(this.screen);
    }

    async OnStart() {
        super.OnStart();

        // Create and add a player entity to the level
        const player = new Player(this.screen, 50, 100);
        player.CurrentLevel = this.LEVEL_HANDLER;
        this.AddEntity(player);

        // Create the camera
        let game_world = {
            width: 1440,
            height: 960
        }
        this.camera = new Camera(new Vector2D(0, 0), this.screen.GetSize());
        this.camera.Init(this.screen, game_world);
        this.camera.LookAt(player);

        // Create a map
        this.scene = new Scene("GravityLevelId", this.screen);
        await this.scene.Load("../Assets/Map/Base_Map").then(() => {
            this.scene.RenderLayers();
        }); // Add await to ensure map is loaded before proceeding
    }

    OnUpdate() {
        super.OnUpdate();
        this.camera.Update(this.entities[0]);
    }

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
        
        this.camera.Begin();
        // Update entities OnDrawn
        this.scene.RenderLayers();
        super.OnDrawn();
        this.camera.End();
    }

    OnGUI() {        
        // Draw FPS
        this.draw.Color = "green";
        this.draw.FontSize = "16px";
        this.draw.DrawText(`FPS: ${this.FPS}`, 750, 20);
        this.draw.FontSize = "12px";
        this.draw.Color = "white";
        // Update entities OnGUI
        super.OnGUI();
    }
}
