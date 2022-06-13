import { Mesh, SphereBufferGeometry, MeshStandardMaterial } from 'three';
import SceneBase from './Scene/SceneBase';
import ASSETS from './assets';

export default class SceneView extends SceneBase {
    isReady = false;
    init () {
        super.init();
        this.load();

        // HELPERS
        this.setControls();
        this.setHelpers();
    }

    preload () {
        if (ASSETS.length > 0) {
            this.load();
        } else {
            this.setup();
        }
    }

    load () {
        // WHEN ASSETS LOADED
        this.setup();
    }

    setup () {
        // AFTER ASSETS LOADED
        this.addTestBox();
        this.isReady = true;
    }

    addTestBox () {
        const sphere = new Mesh(
            new SphereBufferGeometry(1, 32, 32),
            new MeshStandardMaterial({
                color: 0xDDDDDD,
                metalness: 1,
                roughness: 0.3
            })
        );

        this.scene.add(sphere);
    }

    update () {
        if (!this.isReady) return null;
    }
}
