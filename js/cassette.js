/*
cassette model
"VHS Kodak video cassette" (https://skfb.ly/owAWM) by krechet is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
*/

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
let cassette;

// grab container size so the canvas fills it
const container = document.getElementById('cassette');
const width = container.clientWidth;
const height = container.clientHeight;

// scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70, width / height, 0.1, 100 );

const canvas = document.getElementById('cassette-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(width, height);

camera.position.z = 5;

const loader = new GLTFLoader();

// basic lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// load model, position it, open project on click
loader.load( 'models/cassette.glb', function ( gltf ) {
    cassette = gltf.scene;
    scene.add( cassette );
    canvas.style.cursor = 'pointer';
    canvas.addEventListener('click', () => {
        window.open('https://nadsb26.github.io/commslab-project4/', '_blank');
    });
    cassette.scale.set(4, 4, 4);
    cassette.position.set(-1, -1.2, 0);
    // tilts forward/backward
    cassette.rotation.x = 1;
    // spins left/right
    cassette.rotation.y = 0.2;
    cassette.rotation.z = 0;
    console.log(cassette.position, cassette.scale);
    }, undefined, function ( error ) {
    console.error( error );
} );

// drift and sway animation loop
function animate() {
    requestAnimationFrame(animate);
    if (cassette) {
        cassette.position.x = -1 + Math.sin(Date.now() * 0.001) * 0.2;
        cassette.rotation.y = 0.2 + Math.sin(Date.now() * 0.001) * 0.1;
    }
    renderer.render(scene, camera);
}
animate();
