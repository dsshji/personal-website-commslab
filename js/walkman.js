/*
THE MODEL OF SONY WALKMAN
"Sony Walkman" (https://skfb.ly/ovFJS) by julius.j.bib is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
*/

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
let walkman;

const container = document.getElementById('walkman');
const width = container.clientWidth;
const height = container.clientHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 85, width / height, 0.1, 100 );

const canvas = document.getElementById('walkman-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(width, height);


camera.position.z = 5;

const loader = new GLTFLoader();

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

loader.load( 'models/walkman1.glb', function ( gltf ) {
    walkman = gltf.scene; 
    scene.add( walkman );
    walkman.scale.set(1, 1, 1);
    walkman.position.set(0, 0, 0);
    walkman.rotation.x = 0.2;   // tilts forward/backward
    walkman.rotation.y = 0.1;   // spins left/right
    walkman.rotation.y = 0.3;
    console.log(walkman.position, walkman.scale);
    }, undefined, function ( error ) {
    console.error( error );
} );

function animate() {
    requestAnimationFrame(animate);
    if (walkman) {
        walkman.position.y = 0 + Math.sin(Date.now() * 0.001) * 0.2;
        walkman.rotation.y = 0.1 + Math.sin(Date.now() * 0.001) * 0.4;
    }
    renderer.render(scene, camera);
}
animate();
