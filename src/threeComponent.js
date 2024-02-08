

import * as THREE from 'three';


export function wedge() {
    const group = new THREE.Group();

    const radius = 40;
    const height = 60;
    const segments = 16;
    const geometry = new THREE.ConeGeometry(radius, height, segments, segments, false, 0, Math.PI);
    // ConeGeometry(radius : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
    const material = new THREE.MeshStandardMaterial( {
        color: 0xaaaaaa,
        metalness: 0.5,   // between 0 and 1
        roughness: 0.5, // between 0 and 1
        // envMap: scene.environment.texture,
    } );

    group.add( new THREE.Mesh( geometry, material  ).rotateY(-Math.PI/2).translateY(-height/2));
    // group.add( new THREE.AxesHelper( 30 ));
    return group
}



export function table() {
    const group = new THREE.Group();

    // Define the ring parameters
    const innerRadius = 20;
    const outerRadius = 200;
    const segments = 128;
    const ringShape = new THREE.Shape();
    ringShape.moveTo(outerRadius, 0);
    ringShape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
    ringShape.holes.push(new THREE.Path().absarc(0, 0, innerRadius, 0, Math.PI * 2, true));

    // const ringShape = new THREE.RingGeometry( 1, 5, 32 ); 

    // Create the geometry by extruding the ring shape
    const extrudeSettings = {
    depth: 10, // Extrusion depth
    bevelEnabled: false, // Disable bevel for a simple ring
    steps: 1, // Number of extrusion steps
    };

    const geometry = new THREE.ExtrudeGeometry(ringShape, extrudeSettings);

    const material = new THREE.MeshStandardMaterial( {
        color: 0xaaaaaa,
        metalness: 0.5,   // between 0 and 1
        roughness: 0.5, // between 0 and 1
        // envMap: scene.environment.texture,
    } );

    group.add( new THREE.Mesh( geometry, material  ).translateZ(-10));
    // group.add( new THREE.AxesHelper( 3 ));

    return group;
}


export function sample(props) {
    // var membraneSize = 1;
    var sampleSize = 3;
    // var frameWidth = (sampleSize - membraneSize) / 2;
    var frameThickness = 0.2;
    var membraneThickness = 0.01;
  
    const sample = new THREE.Group();
  
    const frameMaterial = new THREE.MeshStandardMaterial( { color: 0xaaaaff, roughness:0 } );
    sample.add( new THREE.Mesh( new THREE.BoxGeometry(1,3,0.2).translate( 1, 0, -(membraneThickness + frameThickness/2) ), frameMaterial ) );
    sample.add( new THREE.Mesh( new THREE.BoxGeometry(1,3,0.2).translate( -1, 0, -(membraneThickness + frameThickness/2) ), frameMaterial ) );
    sample.add( new THREE.Mesh( new THREE.BoxGeometry(1,1,0.2).translate( 0, 1, -(membraneThickness + frameThickness/2) ), frameMaterial ) );
    sample.add( new THREE.Mesh( new THREE.BoxGeometry(1,1,0.2).translate( 0, -1, -(membraneThickness + frameThickness/2) ), frameMaterial ) );
  
    sample.add( new THREE.Mesh( 
        new THREE.BoxGeometry(sampleSize,sampleSize,membraneThickness).translate( 0, 0, -membraneThickness/2 ), 
        new THREE.MeshStandardMaterial( { color: 0xaaaaff, roughness: 0, opacity:0.8, transparent:true} )
    ));
  
    return sample;
    
}