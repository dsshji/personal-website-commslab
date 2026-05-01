/*
IPOD MODEL
"iPod Classic" (https://skfb.ly/6WRO9) by Timothy Ahene is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
*/

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
let ipod;

const container = document.getElementById('ipod');
const width = container.clientWidth;
const height = container.clientHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 5, width / height, 0.1, 100 );

const canvas = document.getElementById('ipod-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(width, height);


camera.position.z = 5;

const loader = new GLTFLoader();

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

loader.load( 'models/ipod.glb', function ( gltf ) {
    ipod = gltf.scene; 
    scene.add( ipod );
    ipod.scale.set(1.6, 1.6, 1.6);
    ipod.position.set(0, -0.02, 0);
    ipod.rotation.x = 0.2;   // tilts forward/backward
    ipod.rotation.y = -1.9;   // spins left/right
    ipod.rotation.z = 0;
    console.log(ipod.position, ipod.scale);
    }, undefined, function ( error ) {
    console.error( error );
} );

function animate() {
    requestAnimationFrame(animate);
    if (ipod) {
        ipod.position.y = -0.02 + Math.sin(Date.now() * 0.001) * 0.02;
        ipod.rotation.y = -1.9 + Math.sin(Date.now() * 0.001) * 0.4;
    }
    renderer.render(scene, camera);
}
animate();
