/*
cctv model
"CCTV-Freepoly.org" (https://skfb.ly/oszHu) by Freepoly.org is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
*/

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
let cctv;

// grab container size so the canvas fills it
const container = document.getElementById('cctv');
const width = container.clientWidth;
const height = container.clientHeight;

// scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 5, width / height, 0.1, 100 );

const canvas = document.getElementById('cctv-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(width, height);

camera.position.z = 5;

const loader = new GLTFLoader();

// basic lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// load model and position it
loader.load( 'models/cctv.glb', function ( gltf ) {
    cctv = gltf.scene;
    scene.add( cctv );
    cctv.scale.set(1, 1, 1);
    cctv.position.set(-0.02, -0.04, 0);
    // tilts forward/backward
    cctv.rotation.x = -0.15;
    // spins left/right
    cctv.rotation.y = 1.6;
    cctv.rotation.z = 0;
    console.log(cctv.position, cctv.scale);
    }, undefined, function ( error ) {
    console.error( error );
} );

// float and sway animation loop
function animate() {
    requestAnimationFrame(animate);
    if (cctv) {
        cctv.position.y = -0.04 + Math.sin(Date.now() * 0.001) * 0.02;
        cctv.rotation.y = 1.6 + Math.sin(Date.now() * 0.001) * 0.3;
    }
    renderer.render(scene, camera);
}
animate();
