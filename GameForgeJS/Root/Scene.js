/**
 * @doc Class Scene
 * @namespace Root
 * @class Scene
 * @summary This class is part of the EngineHtml5 framework and provides functionality to load and render 2D scenes based on maps created with the Tiled tool.
 * @Date 15/05/2019
 * @example
 *  const scene = new Scene("sceneId", screen);
 *  scene.Load("mapName");
 * @returns {Object}
 */
export class Scene {
    constructor(id, screen) {
        this.id = id;
        this.ratio = window.devicePixelRatio || 1;
        this.screen = screen;
        this.screen.Resize(this.screen.Width * this.ratio, this.screen.Height * this.ratio);

        // Initialize layers
        this.layers = [];
    }

    /**
     * @doc Method
     * @param {string} sceneName - The name of the scene to load.
     * @description Load and configure a 2D scene based on a Tiled map.
     * @example
     *  scene.Load("tiledMapName");
     * @returns {void}
     */
    async Load(sceneName) {
        try {
            const response = await fetch(`${sceneName}.json`);
            if (!response.ok) {
                throw new Error("Failed to load map JSON");
            }
            const data = await response.json();
            this.LoadTileset(data);
        } catch (error) {
            console.error("Error loading scene:", error);
        }
    }

    /**
     * @doc Method
     * @param {Object} json - The JSON data from the Tiled tool.
     * @description Load tileset and prepare for rendering layers.
     * @example
     *  scene.LoadTileset(jsonFile);
     * @returns {void}
     */
    LoadTileset(json) {
        this.data = json;
        this.tileset = new Image();
        this.tileset.src = json.tilesets[0].image;
        this.tileset.onload = () => {
            console.log("Tileset image loaded");
            this.RenderLayers();
        };
    }

    /**
     * @doc Method
     * @param {Object} layer - The layer to render.
     * @description Render a single layer from the tileset.
     * @example
     *  scene.RenderLayer(layer);
     * @returns {void}
     */
    RenderLayer(layer) {
        if (layer.type !== "tilelayer" || !layer.opacity) return;
    
        const size = this.data.tilewidth;
        const ctx = this.screen.Context;
        
        layer.data.forEach((tileIdx, i) => {
            if (!tileIdx) return;
            tileIdx--;
            const tile = this.data.tilesets[0];
            const imgX = (tileIdx % (tile.imagewidth / size)) * size;
            const imgY = Math.floor(tileIdx / (tile.imagewidth / size)) * size;
            const sX = (i % layer.width) * size;
            const sY = Math.floor(i / layer.width) * size;
    
            // Only draw if the tile is within the visible screen area
            if (sX + size > this.screen.x && sX < this.screen.x + this.screen.Width &&
                sY + size > this.screen.y && sY < this.screen.y + this.screen.Height) {
                ctx.drawImage(this.tileset, imgX, imgY, size, size, sX, sY, size, size);
            }
        });
    }
    
    

    /**
     * @doc Method
     * @description Render all layers from the tileset.
     * @example
     *  scene.RenderLayers();
     * @returns {void}
     */
    RenderLayers() {
        if (this.data) {
            this.data.layers.forEach(layer => {
                this.RenderLayer(layer);
            });
            
            this.layers.forEach((src) => {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    this.screen.Context.drawImage(img, 0, 0)
                };
            });
        }
    }
}
