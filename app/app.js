//let THREE = require('three');
import style from './style.css';
import * as THREE from 'three';

let scene,camera,renderer;

let h, m, s, clock;

let mx, my;

init();
animate();

function createClock(){
  clock = [];

  let geometry = new THREE.BoxGeometry( 50, 50, 50 );
  let material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );


  //numbers
  const n = 12;
  for(let i = 0; i < n; i++){
    let mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = Math.sin(2*Math.PI*i/n)*0.7*window.innerHeight;
    mesh.position.y = Math.cos(2*Math.PI*i/n)*0.7*window.innerHeight;
    scene.add( mesh );
    clock.push(mesh);
  }


  geometry = new THREE.BoxGeometry( 20, 20, 20 );
  material = new THREE.MeshBasicMaterial( { color: 0x440000, wireframe: true } );
  //circle
  let x = 200;
  for(let y = 0; y < x; y++){
    let mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = Math.sin(2*Math.PI*y/x)*0.7*window.innerHeight;
    mesh.position.y = Math.cos(2*Math.PI*y/x)*0.7*window.innerHeight;
    scene.add( mesh );
  }
}

function createBlockArray(size, color, number, parent){

    let geometry = new THREE.BoxGeometry( size, size, size );
    let material = new THREE.MeshBasicMaterial( { color: color, wireframe: true } );

    for(let i = 0; i < number; i++){
      let mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );
      parent.push(mesh);
    }
}

function createS(){
  s = [];
  createBlockArray(40,0xffffff,12,s)
  // s = [];
  //
  // let geometry = new THREE.BoxGeometry( 40, 40, 40 );
  // let material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
  //
  // for(let i = 0; i < 12; i++){
  //   let mesh = new THREE.Mesh( geometry, material );
  //   scene.add( mesh );
  //   s.push(mesh);
  // }
}

function createM(){
  m = [];

  createBlockArray(40,0x0000ff,12,m);
}

function createH(){
  h = [];

  createBlockArray(40,0x00ff00,12,h);
}

function init(){
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;

  //geometry = new THREE.BoxGeometry( 100, 100, 100 );
  //material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

  mx = 0;
  my = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX/window.innerWidth - 0.5;
    my = e.clientY/window.innerHeight - 0.5;
  })

  createClock();
  createS();
  createM();
  createH();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );
}

function animate(){
  requestAnimationFrame( animate );
  let d = new Date();
  const seconds = d.getSeconds();
  const minutes = d.getMinutes();
  const hours = d.getHours();

  s.map((block,id) => {
    block.position.x = Math.sin(2*Math.PI*seconds/60)*0.055*window.innerHeight*id;
    block.position.y = Math.cos(2*Math.PI*seconds/60)*0.055*window.innerHeight*id;
  });

  m.map((block,id) => {
    block.position.x = Math.sin(2*Math.PI*(minutes/60 + seconds/(60*60)))*0.05*window.innerHeight*id;
    block.position.y = Math.cos(2*Math.PI*(minutes/60 + seconds/(60*60)))*0.05*window.innerHeight*id;
  });

  h.map((block,id) => {
    block.position.x = Math.sin(2*Math.PI*(hours/12 + minutes/(12*60)))*0.03*window.innerHeight*id;
    block.position.y = Math.cos(2*Math.PI*(hours/12 + minutes/(12*60)))*0.03*window.innerHeight*id;
  });

  renderer.render( scene, camera );
}

// let scene, camera, renderer;
// let geometry, material, mesh;
//
// init();
// animate();
//
// function init() {
//
//     scene = new THREE.Scene();
//
//     camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
//     camera.position.z = 1000;
//
//     geometry = new THREE.BoxGeometry( 200, 200, 200 );
//     material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
//
//     mesh = new THREE.Mesh( geometry, material );
//     scene.add( mesh );
//
//     renderer = new THREE.WebGLRenderer();
//     renderer.setSize( window.innerWidth, window.innerHeight );
//
//     document.body.appendChild( renderer.domElement );
//
// }
//
// function animate() {
//
//     requestAnimationFrame( animate );
//
//     mesh.rotation.x += 0.01;
//     mesh.rotation.y += 0.02;
//
//     renderer.render( scene, camera );
//
// }
