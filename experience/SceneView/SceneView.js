import { MathUtils, BoxGeometry, Group, Mesh, MeshBasicMaterial, Object3D, SphereBufferGeometry, SphereGeometry } from 'three';
import SceneBase from './Scene/SceneBase';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Tree from '../elements/Tree';
import Planet from '../elements/Planet';


export default class SceneView extends SceneBase {
    init () {
        super.init();
        this.isReady = false;
        // HELPERS
        this.setControls();
        this.setHelpers();
        this.load();
        this.setup();

        // window.addEventListener('click', () => {
        //     this.planets.forEach(planet => planet.parameters.speed += 0.01);
        // });
    }

    setup () {
        this.planets = [];

        // À REFACTO
        const earth = new Planet({
            distance: 30,
            speed: 0.01,
            size: 2,
            color: 0x0000FF
        });
        this.scene.add(earth.object); // Ajoute à la scene
        this.planets.push(earth);

        const mars = new Planet({
            distance: 20,
            speed: 0.02,
            size: 0.8,
            color: 0xFF0000
        });
        this.scene.add(mars.object); // Ajoute à la scene
        this.planets.push(mars);

        this.isReady = true;
    }

    load() {
        const loader = new GLTFLoader();

        loader.load('/assets/models/spinning-top.gltf', (gltf) => {
            console.log(gltf.scene);
            this.scene.add(gltf.scene);
        })
    }

    addTestSphere () {
        const sphereGeometry = new SphereGeometry(10, 32, 32);
        const sphereMaterial = new MeshBasicMaterial({
            color: 0xFFFFFF,
            wireframe: true
        });

        this.sphereMesh = new Mesh(sphereGeometry, sphereMaterial);

        // this.scene.add(this.sphereMesh);

       this.addForest();
    }

    addForest() {
        const positions = [
            {x: 10, y: 0, z: 5},
            {x: -4, y: 0, z: 5},
            {x: 3, y: 0, z: 0}
        ];

        this.forest = new Group();

        positions.forEach(position => {
            this.forest.add(this.addTree(position));
        });

        this.scene.add(this.forest);
    }

    addTree({x, y, z}) {
        const height = Math.random() * 5 + 5,
            geometry = new BoxGeometry(1, height, 1),
            material = new MeshBasicMaterial(),
            mesh = new Mesh(geometry, material);

        const leafs = new Mesh(
            new SphereBufferGeometry(height * .5, 32, 32),
            new MeshBasicMaterial({ color: 0x444444 })
        );
        leafs.position.y = height;
        mesh.position.set(x, height/2, z); 
        mesh.add(leafs);

        return mesh;
    }

    update () {
        if (this.isReady) {
            this.planets.forEach(planet => planet.update());
        }
    }
}
