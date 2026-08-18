import * as THREE from 'three';
export function createtuktuk({main = "yellow", back = "black" } = {}){
    const f = new THREE.Group();
    const newmat = (c) => new THREE.MeshLambertMaterial({color: c});
    const box = (w,h,d,c) => new THREE.Mesh(new THREE.BoxGeometry(w,h,d), newmat(c)); 
    const frame = box(2.2, 0.45, 1.0, back);
    frame.position.set(0, 0.5, 0);
    f.add(frame)
    const body = box(0.9, 0.5,1.0, main);
    body.position.set(-0.5,1,0);
    f.add(body);
    const front = box(0.5, 0.7, 0.7,main);
    front.position.set(0.85, 0.85, 0);
    f.add(front);
    const windsheild = box(0.1, 0.5, 0.6, "grey");
    windsheild.position.set(1.0, 1.3, 0);
    f.add(windsheild)
    for (const [x, z] of [[0.7, 0.5], [0.7, -0.5], [-0.9, 0.5],[-0.9,-0.5]]){
        const post = box(0.1, 0.85, 0.1, 0x394452);
        post.position.set(x,1.28,z);
        f.add(post);
    }
    const roof = box(2, 0.1, 1.1, back);
    roof.position.set(-.1, 1.75, 0);
    f.add(roof);
    const wheelgeo = new THREE.CylinderGeometry(0.36, 0.36, 0.22, 18);
    const wheelmat = newmat("dimgrey");
    const mkwheel = (x,z) => {
        const w = new THREE.Mesh(wheelgeo, wheelmat);
        w.rotation.x = Math.PI / 2;
        w.position.set(x, 0.35, z);
        f.add(w);
        return w;
    };
    const steerpivot = new THREE.Group();
    steerpivot.position.set(1.0, 0.35, 0);
    f.add(steerpivot);
    const frontwheel = new THREE.Mesh(wheelgeo, wheelmat);
    frontwheel.rotation.x = Math.PI / 2;
    steerpivot.add(frontwheel);
    const wheels = [frontwheel, mkwheel(-0.75, 0.6), mkwheel(-0.75, -0.6)];
    const frontlights = box(0.12,0.22,0.22, 0xfff3c4);
    frontlights.position.set(1.15,0.9,0);
    f.add(frontlights)
    f.traverse((o)=> {o.castShadow = true;});
    f.userData.steerpivot = steerpivot;
    f.userData.wheels = wheels;
    return f;
}