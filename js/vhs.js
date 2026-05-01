/*
CAMERA MODEL
"Panasonic VHS-C MOVIE CAMERA NV-A3" (https://skfb.ly/orJC7) by Arthur Vanneste is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
*/

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
let vhs;

const container = document.getElementById('vhs');
const width = container.clientWidth;
const height = container.clientHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 100 );

const canvas = document.getElementById('vhs-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(width, height);


camera.position.z = 5;

const loader = new GLTFLoader();

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

loader.load( 'models/vhs.glb', function ( gltf ) {
    vhs = gltf.scene; 
    scene.add( vhs );
    vhs.scale.set(0.2, 0.2, 0.2);
    vhs.position.set(-1, -1.6, 0.5);
    vhs.rotation.x = 0.1;   // tilts forward/backward
    vhs.rotation.y = 0.8;   // spins left/right
    vhs.rotation.z = 0.3;
    console.log(vhs.position, vhs.scale);
    }, undefined, function ( error ) {
    console.error( error );
} );

function animate() {
    requestAnimationFrame(animate);
    if (vhs) {
        vhs.position.y = -1.6 + Math.sin(Date.now() * 0.001) * 0.1;
        vhs.rotation.y = 0.8 + Math.sin(Date.now() * 0.001) * 0.1;
    }
    renderer.render(scene, camera);
}
animate();
