import { GameObject } from "../Framework/Root/GameObject.js";
import { Vector2D } from "../Framework/Math/Vector2D.js";
import { Draw } from "../Framework/Graphic/Draw.js";
import { Sprite } from "../Framework/Graphic/Sprite.js";
import { Util } from "../Framework/Root/Utils.js";
import { MathExt } from "../Framework/Math/MathExt.js";
import { LevelHandler } from "../Framework/Root/Engine.js";

// Sprite positions enum
const SPRITE_POSITIONS = Object.freeze({
    DOWN: 0,
    LEFT: 1,
    RIGHT: 2,
    UP: 3
});

export class Enemy_0 extends GameObject {
    constructor(screen, x, y) {
        super();
        this.position = new Vector2D(x, y);
        this.size = new Vector2D(48, 48);
        this.velocity = new Vector2D(0, 0);
        this.hasGravity = true; // Indicates that this entity is affected by gravity
        this.name = "Enemy";
        this.speed = 200; // Movement speed

        // Graphic settings
        this.draw = new Draw(screen);
        this.sprite = new Sprite(screen);
        this.sprite_sheet_file_name = "../Assets/sprite_sheet_0.png";  // Sprite Animations
        this.sprite_picture_file_name = "../Assets/sprite_faces_0.png";   // Sprite Portrait
        this.spritePositions = SPRITE_POSITIONS.DOWN; // Sprite row animation
        this.sprite.frameCount = 3; // How much frames the animation has

        // Status
        this.Health = 350;  this.MaxHealth = this.Health;
        this.Mana = 100;    this.MaxMana = this.Mana;
        this.Stamine = 100; this.MaxStamine = this.Stamine;
        // Status Acting
        this.Attack = 10;
        this.Defense = 7;

        // Action control
        this.currentAction = "Stay";
        this.actionTimer = 0;
        this.actionDuration = 1; // seconds
    }

    OnStart() {
        // console.dir(this);
        this.move_actions = ["Stay", "Left", "Right", "Up", "Down"];
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

        let player = LevelHandler.current.GetEntityByName("Player");

        // Collision with player. If it happen player take damage
        this.OnCollision(player, () => {
            console.log("Colisão detectada!");
            let real_attack = this.Attack - player.Defense;
            console.log("Dano Real: ", real_attack);
            player.Health -= real_attack;
        });
    }

    OnDrawn() {
        // Draw object animation
        this.sprite.size = this.size;
        this.sprite.Animation(this.sprite_sheet_file_name, this.position, "horizontal", this.spritePositions);

        // Draw life bar
        this.draw.Color = "grey";
        this.draw.DrawRect(this.position.x, this.position.y - 8, this.size.x, 4);
        this.draw.Color = "red";
        this.draw.DrawRect(this.position.x, this.position.y - 8, (this.Health/this.MaxHealth)*this.size.x, 4);
    }

    HandleInput(deltaTime) {
        this.isMoving = false;
        this.actionTimer += deltaTime;

        if (this.actionTimer >= this.actionDuration) {
            this.actionTimer = 0;
            this.currentAction = this.ChooseNewAction();
        }

        this.PerformAction(this.currentAction, deltaTime);
    }

    ChooseNewAction() {
        let player = LevelHandler.current.GetEntityByName("Player");

        let distance = MathExt.Distance(this, player);

        if (distance < 180) {
            return Util.Choose(this.move_actions);
        }

        return "Stay";
    }

    PerformAction(action, deltaTime) {
        switch (action) {
            case "Left":
                this.spritePositions = SPRITE_POSITIONS.LEFT;
                this.position.x -= this.speed * deltaTime;
                this.isMoving = true;
                break;
            case "Right":
                this.spritePositions = SPRITE_POSITIONS.RIGHT;
                this.position.x += this.speed * deltaTime;
                this.isMoving = true;
                break;
            case "Up":
                this.spritePositions = SPRITE_POSITIONS.UP;
                this.position.y -= this.speed * deltaTime;
                this.isMoving = true;
                break;
            case "Down":
                this.spritePositions = SPRITE_POSITIONS.DOWN;
                this.position.y += this.speed * deltaTime;
                this.isMoving = true;
                break;
            default:
                break;
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
