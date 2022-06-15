import { MathUtils, BufferGeometry,Points, PointsMaterial,Float32BufferAttribute, FogExp2,  BoxGeometry, Group, Mesh, MeshBasicMaterial, Object3D, SphereBufferGeometry, SphereGeometry, Fog } from 'three';
import SceneBase from './Scene/SceneBase';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Tree from '../elements/Tree';
import Planet from '../elements/Planet';
import system from '../data/system';
import Stars from '../elements/Stars';
import CameraCurve from '../elements/CameraCurve';

export default class SceneView extends SceneBase {
    init () {
        super.init();
        this.isReady = false;
        // HELPERS
        this.setControls();
        this.setHelpers();
        this.setup();
        // window.addEventListener('click', () => {
        //     this.planets.forEach(planet => planet.parameters.speed += 0.01);
        // });

    }

    setup () {
        this.addStars();
        this.cameraCurve = new CameraCurve(this.camera, this.scene);

        this.planets = new Group();

        system.planets.forEach(planetData => {
            this.planets.add(new Planet(planetData));
        });

        this.planets.position.set(0, 0, 0);
        this.scene.add(this.planets);

        // FOG
        // this.scene.fog = new Fog( 0xefd1b5, 40, 50 );

        this.isReady = true;

        
    }

    addStars () {
        this.starsContainer = new Group();

        for (let i = 0; i < 3; i += 1) {
            this.starsContainer.add( new Stars());
        }
        
        this.scene.add(this.starsContainer);
    }

    update () {
        if (this.isReady) {
            this.planets.children.forEach(planet => planet.update());
            this.starsContainer.children.forEach(stars => stars.update());
            this.cameraCurve.update();
            // this.camera.lookAt(this.planets.children[0].position);
            // this.camera.position.copy(this.planets.children[1].position);
        }
    }
}
