import { GameObject } from "../Framework/Root/GameObject.js";
import { Vector2D } from "../Framework/Math/Vector2D.js";
import { Input } from "../Framework/Input/Input.js";
import { KeyCode } from "../Framework/Input/KeyCode.js";
import { Draw } from "../Framework/Graphic/Draw.js";
import { Sprite } from "../Framework/Graphic/Sprite.js";

// Sprite positions enum
const SPRITE_POSITIONS = Object.freeze({
    DOWN: 0,
    LEFT: 1,
    RIGHT: 2,
    UP: 3
});

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
export class Player extends GameObject {
    constructor(screen, x, y) {
        super();
        this.position = new Vector2D(x, y);
        this.size = new Vector2D(48, 48);
        this.velocity = new Vector2D(0, 0);
        this.hasGravity = true; // Indicates that this entity is affected by gravity
        this.name = "Player";
        this.speed = 200; // Movement speed

        // Graphic settings
        this.draw = new Draw(screen);
        this.sprite = new Sprite(screen);
        this.spriteSheetFileName = "../Assets/sprite_sheet_0.png";  // Sprite Animations
        this.spriteFaceFileName = "../Assets/sprite_faces_0.png";   // Sprite Portrait
        this.spritePositions = SPRITE_POSITIONS.DOWN; // Sprite row animation
        this.sprite.frameCount = 3; // How much frames the animation has

        // Player Status
        this.Health = 470;
        this.MaxHealth = this.Health;
        this.Mana = 190;
        this.MaxMana = this.Mana;
        this.Stamine = 100;
        this.MaxStamine = this.Stamine;

    }

    OnStart() {
        console.log("Player started at position:", this.position);
    }

    OnUpdate() {
        // Only update sprite if the player is moving
        if (this.isMoving) {
            this.sprite.Update();
        } else {
            this.sprite.Reset();
        }
    }

    OnFixedUpdate(deltaTime) {
        this.HandleInput(deltaTime);
    }

    OnDrawn() {
        this.sprite.size = this.size;
        this.sprite.Animation(this.spriteSheetFileName, this.position, "horizontal", this.spritePositions);
    }

    OnGUI() {
        // Draw player positions
        this.draw.Color = "white"; let _xx = this.position.x; let _yy = this.position.y;
        this.draw.DrawText(`x: ${_xx.toFixed(0)}, y: ${_yy.toFixed(0)}`, 16, 620);

        // Draw player face
        this.sprite.Clipping(
            this.spriteFaceFileName,
            new Vector2D(0, 0),
            new Vector2D(72, 72),
            new Vector2D(288, 0),
            new Vector2D(144, 144));

        //#region Draw HP, MP and Stamina bar 
        let hpbar = {
            _x: 76,
            _y: 16,
            _size: 100
        } 
        // Background Bar
        this.draw.Color = "grey";
        this.draw.DrawRect(hpbar._x, hpbar._y, hpbar._size, 16);
        // Foreground Bar
        this.draw.Color = "green";
        this.draw.DrawRect(hpbar._x, hpbar._y, (this.Health/this.MaxHealth)*hpbar._size, 16);
        // Text Bar
        this.draw.Color = "white";
        this.draw.DrawText(`Hp: ${this.Health}/${this.MaxHealth}`, hpbar._x, hpbar._y + 12);

        let mpbar = {
            _x: 76,
            _y: 36,
            _size: 100
        }
        // Background Bar
        this.draw.Color = "grey";
        this.draw.DrawRect(mpbar._x, mpbar._y, mpbar._size, 16);
        // Foreground Bar
        this.draw.Color = "blue";
        this.draw.DrawRect(mpbar._x, mpbar._y, (this.Mana/this.MaxMana)*mpbar._size, 16);

        let stbar = {
            _x: 76,
            _y: 56,
            _size: 100
        }
        // Background Bar
        this.draw.Color = "grey";
        this.draw.DrawRect(stbar._x, stbar._y, stbar._size, 16);
        // Foreground Bar
        this.draw.Color = "gold";
        this.draw.DrawRect(stbar._x, stbar._y, (this.Stamine/this.MaxStamine)*stbar._size, 16);
        //#endregion

        // Default Settings
        this.draw.Color = "white";
    }

    HandleInput(deltaTime) {
        this.isMoving = false;

        if (Input.GetKey(KeyCode.A)) {
            this.spritePositions = SPRITE_POSITIONS.LEFT;
            this.position.x -= this.speed * deltaTime;
            this.isMoving = true;
        }
        if (Input.GetKey(KeyCode.D)) {
            this.spritePositions = SPRITE_POSITIONS.RIGHT;
            this.position.x += this.speed * deltaTime;
            this.isMoving = true;
        }
        if (Input.GetKey(KeyCode.W)) {
            this.spritePositions = SPRITE_POSITIONS.UP;
            this.position.y -= this.speed * deltaTime;
            this.isMoving = true;
        }
        if (Input.GetKey(KeyCode.S)) {
            this.spritePositions = SPRITE_POSITIONS.DOWN;
            this.position.y += this.speed * deltaTime;
            this.isMoving = true;
        }
    }
}
