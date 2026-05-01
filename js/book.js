/*
BOOK MODEL
"Book - Fables de La Fontaine" (https://skfb.ly/osZ9S) by Sirolalo is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
*/

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
let book;

const container = document.getElementById('book');
const width = container.clientWidth;
const height = container.clientHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 5, width / height, 0.1, 100 );

const canvas = document.getElementById('book-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(width, height);


camera.position.z = 5;

const loader = new GLTFLoader();

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

loader.load( 'models/book.glb', function ( gltf ) {
    book = gltf.scene; 
    scene.add( book );
    book.scale.set(1, 1, 1);
    book.position.set(0.1, -0.16, 0);
    book.rotation.x = 0.2;   // tilts forward/backward
    book.rotation.y = 1.9;   // spins left/right
    book.rotation.z = 0;
    console.log(book.position, book.scale);
    }, undefined, function ( error ) {
    console.error( error );
} );

function animate() {
    requestAnimationFrame(animate);
    if (book) {
        book.position.y = -0.16 + Math.sin(Date.now() * 0.001) * 0.02;
        book.rotation.y = 1.9 + Math.sin(Date.now() * 0.001) * 0.3;
    }
    renderer.render(scene, camera);
}
animate();
