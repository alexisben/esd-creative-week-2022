import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";

export default class Tree {
    constructor() {
        this.object = new Object3D();

        const sphere = new Mesh(
            new SphereGeometry(2, 32, 32),
            new MeshBasicMaterial()
        );
        const sphere2 = new Mesh(
            new SphereGeometry(2, 32, 32),
            new MeshBasicMaterial()
        );
        
        this.object.add(sphere, sphere2);
    }
}