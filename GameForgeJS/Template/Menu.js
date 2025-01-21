import { Base } from '../Root/Base.js';
import { Draw } from '../Graphic/Draw.js';
import { Input } from '../Input/Input.';

export class Menu extends Base {
    constructor(screen) {
        super();
        this.screen = screen;
        this.draw = new Draw(this.screen);

        this.options = new Array("Novo Jogo", "Continuar", "Opções", "Sair");

        // Item selecionado do menu
        this.currentSelected = 0;
    }

    OnStart() {
        this.draw.FontSize = "45px";
        console.log(this.options);
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
    }
}