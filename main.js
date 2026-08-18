import * as THREE from 'three';

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
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00
});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0,0,0);
cube.position.y = 2;
cube.position.x - -1;
mainview.add(cube);
camera.position.z = 10;

function animate(){
    requestAnimationFrame(animate);
    renderer.render(mainview, camera);
}
animate();