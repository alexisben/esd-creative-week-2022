import { Object3D, BufferGeometry, Float32BufferAttribute, PointsMaterial, Points } from "three";

const DEFAULT_SPEED = 0.0004;

export default class Stars extends Object3D {
    constructor () {
        super();

        const vertices = [],
            distance = 200,
            quantity = 300,
            geometry = new BufferGeometry();

        let material;

        for ( let i = 0; i < quantity; i ++ ) {
            const x = distance * Math.random() - distance / 2;
            const y = distance * Math.random() - distance / 2;
            const z = distance * Math.random() - distance / 2;
            vertices.push( x, y, z );
        }

        geometry.setAttribute('position', new Float32BufferAttribute( vertices, 3 ) );
        material = new PointsMaterial( { size: 0.4, sizeAttenuation: true } );

        this.particles = new Points( geometry, material );
        this.add( this.particles );

        this.speed = {
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
            z: Math.random() - 0.5
        };
    }
    update () {
        this.rotation.x += DEFAULT_SPEED * this.speed.x;
        this.rotation.y += DEFAULT_SPEED * this.speed.y;
        this.rotation.z += DEFAULT_SPEED * this.speed.z;
    }
}