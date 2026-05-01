/*
VHS MODEL
"VHS Kodak video cassette" (https://skfb.ly/owAWM) by krechet is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
*/

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
let cassette;

const container = document.getElementById('cassette');
const width = container.clientWidth;
const height = container.clientHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70, width / height, 0.1, 100 );

const canvas = document.getElementById('cassette-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(width, height);


camera.position.z = 5;

const loader = new GLTFLoader();

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

loader.load( 'models/cassette.glb', function ( gltf ) {
    cassette = gltf.scene; 
    scene.add( cassette );
    cassette.scale.set(4, 4, 4);
    cassette.position.set(-1, -1.2, 0);
    cassette.rotation.x = 1;   // tilts forward/backward
    cassette.rotation.y = 0.2;   // spins left/right
    cassette.rotation.z = 0;   
    console.log(cassette.position, cassette.scale);
    }, undefined, function ( error ) {
    console.error( error );
} );

function animate() {
    requestAnimationFrame(animate);
    if (cassette) {
        cassette.position.x = -1 + Math.sin(Date.now() * 0.001) * 0.2;
        cassette.rotation.y = 0.2 + Math.sin(Date.now() * 0.001) * 0.1;
    }
    renderer.render(scene, camera);
}
animate();
