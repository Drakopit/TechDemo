import { Draw } from "../GameForgeJS/Graphic/Draw.js";
import { Level } from "../GameForgeJS/Template/Level.js";
import { Screen } from "../GameForgeJS/Window/Screen.js";
import { Input } from "../GameForgeJS/Input/Input.js";
import { KeyCode } from "../GameForgeJS/Input/KeyCode.js";

export class MainMenu extends Level {
    constructor() {
        super();
        this.caption = "Main Menu Level";
        this.LEVEL_HANDLER = this;
    }

    OnStart() {
        this.TelaId = "MainMenu";
        this.screen = new Screen(this.TelaId, 640, 480);
        this.draw = new Draw(this.screen);

        this.options = new Array("Novo Jogo", "Continuar", "Opções", "Sair");

        // Item selecionado do menu
        this.currentSelected = 0;


        this.draw.FontSize = "45px";
    }

    OnUpdate() {
        if (Input.GetKeyUp(KeyCode.W)) {
            this.currentSelected--;
            if (this.currentSelected < 0) {
                this.currentSelected = (this.options.length - 1);
            }
        } else if (Input.GetKeyUp(KeyCode.S)) {
            this.currentSelected++;
            if (this.currentSelected > (this.options.length - 1)) {
                this.currentSelected = 0;
            }
        }

        if (Input.GetKeyUp(KeyCode.E) && this.currentSelected == 0) {
            this.Next = true;
        }
    }

    OnGUI() {
        for (let i = 0; i <= 3; i++) {
            if (i == this.currentSelected) {
                this.draw.Color = "lightgray";
            } else {
                this.draw.Color = "lime";
            }
            this.draw.DrawText(this.options[i], 32, 64 + i * 64);
        }
        super.OnGUI();
    }
}