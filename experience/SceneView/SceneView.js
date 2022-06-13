import { Mesh, SphereBufferGeometry, MeshStandardMaterial } from 'three';
import SceneBase from './Scene/SceneBase';

export default class SceneView extends SceneBase {
    isReady = false;
    init () {
        super.init();

        // HELPERS
        this.setControls();
        this.setHelpers();

        this.setup();
    }

    setup () {
        this.addTestBox();
        this.isReady = true;
    }

    addTestBox () {
        const sphere = new Mesh(
            new SphereBufferGeometry(1, 32, 32),
            new MeshStandardMaterial({
                color: 0xDDDD00
            })
        );

        this.scene.add(sphere);
    }

    update () {
        if (!this.isReady) return null;
    }
}
