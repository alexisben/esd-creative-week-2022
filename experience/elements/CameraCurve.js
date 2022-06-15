import {Mesh, CatmullRomCurve3, Vector3, BufferGeometry, LineBasicMaterial, Line, SphereGeometry, MeshBasicMaterial } from "three";


const DURATION = 2;

export default class CameraCurve {
    constructor(camera, scene) {
        this.tick = 0;
        this.camera = camera;
        this.scene = scene;
        this.init();
    }
    init() {
        this.curve = new CatmullRomCurve3([
                new Vector3( -20, -10, 0 ),
                new Vector3( 3, 20, 50 ),
                new Vector3( 20, 12, 0 ),
                new Vector3( 20, -20, 0 ),
        ]);
        this.curve.closed = true;

        const points = this.curve.getPoints( 50 );
        console.log(points);
        const geometry = new BufferGeometry().setFromPoints( points );
        const material = new LineBasicMaterial( { color: 0xffffff } );
        const curveObject = new Line( geometry, material );

        this.scene.add(curveObject);
        
        this.sphere = new Mesh(
            new SphereGeometry(.5, 32, 32),
            new MeshBasicMaterial()
        );

        this.scene.add(this.sphere);

    }
    update() {
        const time = Math.min(DURATION, (this.tick / 30) / DURATION);
        const progression = time / DURATION;
        const position = this.curve.getPoint(progression);
        this.tick += 1;

        if (progression >= 1) {
            this.tick = 0;
        }

        this.sphere.position.copy(position);
    }
}