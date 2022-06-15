import { Mesh, MeshBasicMaterial, Object3D, SphereBufferGeometry } from "three";
import TWEEN from "tween.js";

export default class Spheres extends Object3D{
    constructor(sceneView) {
        super();
        this.sceneView = sceneView;
        this.init()
    }
    init() {
        const quantity = 10;
        let sphere, tween;

        this.tweens = [];

        for(let i = 0; i < quantity; i +=1) {
            sphere = new Mesh(
                new SphereBufferGeometry(3, 32, 32),
                new MeshBasicMaterial()
            );
            sphere.position.set(
                Math.random() * 50 - 25,
                Math.random() * 50 - 25,
                Math.random() * 50 - 25
            );
            this.sceneView.scene.add(sphere);
            
            tween = new TWEEN.Tween(sphere.position);
            tween.to({
                x: 0,
                y: 0,
                z: 0
            }, 2000)
            tween.easing(TWEEN.Easing.Exponential.In);

            this.tweens.push(tween);
        }

        console.log(TWEEN.Easing);

        window.addEventListener('click', () => {
            this.play();
        });
    }

    play() {
        this.tweens.forEach(tween => tween.start());
    }
}