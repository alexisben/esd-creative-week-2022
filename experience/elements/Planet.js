import { 
    Mesh,
    MeshBasicMaterial,
    Object3D,
    TextureLoader,
    PointLight,
    SphereGeometry,
    MeshStandardMaterial
} from "three";

const SPEED_FACTOR = 0.01;
export default class Planet extends Mesh {
    constructor({ distance, speed, radius = 1, color = 0xFFFFFF }) {
        let geometry, material, texture;
        texture = new TextureLoader().load( "assets/images/textures/test.jpeg" );
        geometry = new SphereGeometry(radius, 32, 32);
        material = new MeshStandardMaterial({
            color: color,
            // map: texture,
            roughness: 0.6,
            metalness: 0.2
        });

        super(geometry, material);

        this.tick = 0;
        this._speed = speed;
        this.distance = distance;

        this.addLight();
    }

    addLight() {
        const light = new PointLight( 0xeeeeee, 0.1, 100 );
        
        // // Debug sphere
        // const sphere = new Mesh(
        //     new SphereGeometry(0.1, 32, 32),
        //     new MeshBasicMaterial()
        // );

        // light.add(sphere);
        light.position.y = 0;

        this.add( light );
    }

    _getSpeed() {
        return this._speed * SPEED_FACTOR;
    }

    update () {
        this.tick += 1;
        this.rotation.y += this._getSpeed();
        this.position.z = Math.sin(this.tick * this._getSpeed() ) * this.distance;
        this.position.x = Math.cos(this.tick * this._getSpeed() ) * this.distance;
    }
}