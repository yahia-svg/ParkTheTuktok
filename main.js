import * as THREE from 'three';
import { createtuktuk } from './tuktuk';
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const mainview = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 300);
mainview.fog = new THREE.Fog(0x87b7d8, 40, 90);
mainview.background = new THREE.Color(0x87b7d8);

addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
});
mainview.add(new THREE.HemisphereLight(0xbfe3ff, 0x60543f, 0.9));
const mainlight = new THREE.DirectionalLight(0xfff2d5, 1.1);
mainlight.position.set(20,20,10);
mainlight.castShadow = true;
mainlight.shadow.mapSize.set(1024,1024);
const shadowcam = mainlight.shadow.camera;
shadowcam.left = -30; shadowcam.right = 30;
shadowcam.top = 30; shadowcam.bottom = -30;
shadowcam.far = 80;
mainview.add(mainlight);
const MAP = 15;
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(MAP * 2, MAP * 2),
    new THREE.MeshLambertMaterial({color: 0x6b7078})
);
plane.rotation.x = -Math.PI / 2;
mainview.add(plane);

plane.receiveShadow = true;
const wallmat = new THREE.MeshLambertMaterial({color:0xb8b2a4});
for (const [x,z,w,d] of [
    [0, -MAP, MAP * 2, 0.6],
    [0, MAP, MAP * 2, 0.6],
    [-MAP, 0, 0.6, MAP *2],
    [MAP, 0, 0.6, MAP *2]
]) {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(w,1.2,d),wallmat);
    wall.position.set(x, 0.6, z);
    wall.castShadow = wall.receiveShadow = true;
    mainview.add(wall);
}

const tuktuk = createtuktuk();
mainview.add(tuktuk);
const pos = new THREE.Vector2(0,0);
let heading = 0;
let speed = 0;
let rotate = 0;
function synctuktuk(){
    tuktuk.position.set(pos.x, 0, pos.y);
    tuktuk.rotation.y = -heading;
}
synctuktuk();

camera.position.set(0,10,10);
camera.lookAt(0,0,0);
function animate(){
    requestAnimationFrame(animate);
    renderer.render(mainview, camera);

}
animate();