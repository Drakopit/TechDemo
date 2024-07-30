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
 * @namespace Objects
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
        this.sprite_sheet_file_name = "../Assets/sprite_sheet_0.png";  // Sprite Animations
        this.sprite_picture_file_name = "../Assets/sprite_faces_0.png";   // Sprite Portrait
        this.spritePositions = SPRITE_POSITIONS.DOWN; // Sprite row animation
        this.sprite.frameCount = 3; // How much frames the animation has

        // Status
        this.Health = 470;  this.MaxHealth = this.Health;
        this.Mana = 190;    this.MaxMana = this.Mana;
        this.Stamine = 100; this.MaxStamine = this.Stamine;

        // Status Acting
        this.Attack = 10;
        this.Defense = 7;
    }

    OnStart() {
        // console.dir(this);
    }

    OnUpdate() {
        // Only update sprite if the player is moving
        if (this.isMoving) {
            this.sprite.Update();
        } else {
            this.sprite.Reset();
        }

        // Don't let life minor than 0
        if (this.Health < 0) this.Health = 0;
        if (this.Mana < 0) this.Mana = 0;
        if (this.Stamine < 0) this.Stamine = 0;
    }

    OnFixedUpdate(deltaTime) {
        this.HandleInput(deltaTime);
    }

    OnDrawn() {
        this.sprite.size = this.size;
        this.sprite.Animation(this.sprite_sheet_file_name, this.position, "horizontal", this.spritePositions);
    }

    OnGUI() {
        // Draw player positions
        this.draw.Color = "white"; let _xx = this.position.x; let _yy = this.position.y;
        this.draw.DrawText(`x: ${_xx.toFixed(0)}, y: ${_yy.toFixed(0)}`, 16, 620);

        // Draw player face
        let setPicture = {
            pos: new Vector2D(0, 0),
            size: new Vector2D(72, 72),
            cut_pos: new Vector2D(288, 0),
            cut_size: new Vector2D(144, 144)
        }
        this.sprite.Clipping(this.sprite_picture_file_name, setPicture.pos, setPicture.size, setPicture.cut_pos, setPicture.cut_size);

        //#region Draw HP, MP and Stamina bar 
        // HP Bar
        this.DrawBar(new Vector2D(76, 16),
            new Vector2D(100, 16),
            this.Health,
            this.MaxHealth,
            new Vector2D(12, 12), {
            background: "grey",
            foreground: "green",
            text: "white"
        });

        // MP Bar
        this.DrawBar(new Vector2D(76, 36),
            new Vector2D(100, 16),
            this.Mana,
            this.MaxMana,
            new Vector2D(12, 12), {
            background: "grey",
            foreground: "blue",
            text: "white"
        });

        // Stamina Bar
        this.DrawBar(new Vector2D(76, 56),
            new Vector2D(100, 16),
            this.Stamine,
            this.MaxStamine,
            new Vector2D(12, 12), {
            background: "grey",
            foreground: "#dc9c07",
            text: "white"
        });
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

    DrawBar(position, size, value, max_value, text_position, colors) {
        // Background Bar
        this.draw.Color = colors.background;
        this.draw.DrawRect(position.GetValue().x, position.GetValue().y, size.GetValue().x, size.GetValue().y);
        // Foreground Bar
        this.draw.Color = colors.foreground;
        this.draw.DrawRect(position.GetValue().x, position.GetValue().y, (value / max_value) * size.GetValue().x, size.GetValue().y);
        // Text Bar
        this.draw.Color = colors.text;
        this.draw.DrawText(`${value}/${max_value}`, position.GetValue().x + text_position.GetValue().x, position.GetValue().y + text_position.GetValue().y);
    }
}