/*
SKETCHBOOK MODEL
"sketchbook" (https://skfb.ly/6RsSN) by Kisielev Mikhail is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
*/

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
let sketchbook;

const container = document.getElementById('sketchbook');
const width = container.clientWidth;
const height = container.clientHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 80, width / height, 0.1, 100 );

const canvas = document.getElementById('sketchbook-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(width, height);


camera.position.z = 5;

const loader = new GLTFLoader();

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

loader.load( 'models/sketchbook.glb', function ( gltf ) {
    sketchbook = gltf.scene; 
    scene.add( sketchbook );
    canvas.style.cursor = 'pointer';
    canvas.addEventListener('click', () => {
        window.open('https://dsshji.github.io/comms_lab_digitalcomic/', '_blank');
    });
    sketchbook.scale.set(0.0045, 0.0045, 0.0045);
    sketchbook.position.set(-0.15, 0.7, 0);
    sketchbook.rotation.x = 0.75;   // tilts forward/backwar
    sketchbook.rotation.y = 0.1;   // spins left/right
    sketchbook.rotation.z = 0.1;
    console.log(sketchbook.position, sketchbook.scale);
    }, undefined, function ( error ) {
    console.error( error );
} );

function animate() {
    requestAnimationFrame(animate);
    if (sketchbook) {
        sketchbook.position.y = 0.7 + Math.sin(Date.now() * 0.001) * 0.2;
        sketchbook.rotation.y = 0.1 + Math.sin(Date.now() * 0.001) * 0.1;
    }
    renderer.render(scene, camera);
}
animate();
