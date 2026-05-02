/*
computer model
"Retro PC With Pixel Terrarium Screen" (https://skfb.ly/pE6TM) by Pigcraft is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
*/

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
let computer;

// grab container size so the canvas fills it
const container = document.getElementById('computer');
const width = container.clientWidth;
const height = container.clientHeight;

// scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 85, width / height, 0.1, 100 );

const canvas = document.getElementById('computer-canvas');
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

// load model, position it, open project on click
loader.load( 'models/computer.glb', function ( gltf ) {
    computer = gltf.scene;
    scene.add( computer );
    canvas.style.cursor = 'pointer';
    canvas.addEventListener('click', () => {
        window.open('https://dsshji.github.io/comm-lab-26-project1/', '_blank');
    });
    computer.scale.set(6, 6, 6);
    computer.position.set(0.5, 0.6, 0);
    // tilts forward/backward
    computer.rotation.x = 0.2;
    // spins left/right
    computer.rotation.y = -1.8;
    computer.rotation.y = 0;
    console.log(computer.position, computer.scale);
    }, undefined, function ( error ) {
    console.error( error );
} );

// float and sway animation loop
function animate() {
    requestAnimationFrame(animate);
    if (computer) {
        computer.position.y = 0.6 + Math.sin(Date.now() * 0.001) * 0.2;
        computer.rotation.y = -1.8 + Math.sin(Date.now() * 0.001) * 0.2;
    }
    renderer.render(scene, camera);
}
animate();
