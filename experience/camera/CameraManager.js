import { Vector3 } from "three";
import pointer from "../pointer/Pointer";

export default class CameraManager {
    constructor(sceneView) {
        this.DISTANCE = 5;
        this.sceneView = sceneView;
    }
    update() {
        this.sceneView.camera.lookAt(new Vector3(
            pointer.ratio.x * this.DISTANCE, 
            pointer.ratio.y * this.DISTANCE,
            0
        ));
    }
}