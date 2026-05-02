/*
sketchbook model
"sketchbook" (https://skfb.ly/6RsSN) by Kisielev Mikhail is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
*/

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
let sketchbook;

// grab container size so the canvas fills it
const container = document.getElementById('sketchbook');
const width = container.clientWidth;
const height = container.clientHeight;

// scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 80, width / height, 0.1, 100 );

const canvas = document.getElementById('sketchbook-canvas');
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
loader.load( 'models/sketchbook.glb', function ( gltf ) {
    sketchbook = gltf.scene;
    scene.add( sketchbook );
    canvas.style.cursor = 'pointer';
    canvas.addEventListener('click', () => {
        window.open('https://dsshji.github.io/comms_lab_digitalcomic/', '_blank');
    });
    sketchbook.scale.set(0.0045, 0.0045, 0.0045);
    sketchbook.position.set(-0.15, 0.7, 0);
    // tilts forward/backward
    sketchbook.rotation.x = 0.75;
    // spins left/right
    sketchbook.rotation.y = 0.1;
    sketchbook.rotation.z = 0.1;
    console.log(sketchbook.position, sketchbook.scale);
    }, undefined, function ( error ) {
    console.error( error );
} );

// float and sway animation loop
function animate() {
    requestAnimationFrame(animate);
    if (sketchbook) {
        sketchbook.position.y = 0.7 + Math.sin(Date.now() * 0.001) * 0.2;
        sketchbook.rotation.y = 0.1 + Math.sin(Date.now() * 0.001) * 0.1;
    }
    renderer.render(scene, camera);
}
animate();
