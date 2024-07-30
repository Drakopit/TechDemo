import { Engine, LevelHandler } from "./Framework/Root/Engine.js";
import { GravityLevel } from "./Levels/GravityLevel.js";

/**
 * @author Patrick Faustino Camello
 * @description Initialize the Game.
 * @summary Everything is on Game Class.
 * And Game class initializes, entire game
 * with all assets
 */

try {
    // Add levels before starting the engine
    LevelHandler.addLevel(new GravityLevel("GravityLevel"));
    // Add more levels as needed...

    Engine.OnStart();
    console.dir(Engine);
} catch(exception) {
    console.error(`Exception: ${exception}`);
}
