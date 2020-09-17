var mesh, loaded = false, scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(50,window.innerWidth / window.innerHeight,0.01,1000), renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.physicallyCorrectLights = true;
renderer.domElement.id = 'three';
document.body.appendChild(renderer.domElement);
var hemiLight = new THREE.HemisphereLight(0xffffff,0xffffff,1.5);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight);
var dirLight = new THREE.DirectionalLight(0xffffff,2.5);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1024,1024);
scene.add(dirLight);
var clock = new THREE.Clock(), mixer;
var loader = new THREE.GLTFLoader();
loader.load('wind/untitled4.gltf', function(gltf) {
    mesh = gltf.scene;
    mesh.position.set(-1, 1, 0);
    mesh.receiveShadow = true;
    mesh.children[3].material.opacity = 0.5;
    mesh.children[3].material.color.b = 0.9;
    mesh.children[3].material.transparent = true;
    mesh.children[3].material.refractionRatio = 2.0;
    scene.add(mesh);
}, function(xhr) {
        document.querySelector('#loading').innerHTML = "loading...";
}, function(error) {
    document.querySelector('#loading').innerHTML = 'error';
});
camera.position.set(-1.5, 0, 2);
camera.lookAt(0,0,0);
window.addEventListener('resize', onWindowResize, false);
var initRotate = 0;
function initialRotation() {
    document.querySelector('#loading').style.visibility = 'hidden';
    initRotate += 1;
    if (initRotate <= 120) {
        mesh.rotation.y += Math.PI / 60;
        mesh.rotation.z += Math.PI / 60;
        mesh.rotation.x += Math.PI / 30;
        mesh.position.x += 0.01;
        mesh.position.y -= 0.01;
    } else {
        loaded = true;
    }
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    if (mesh != null && loaded == false) {
        initialRotation();
    }
}
animate();