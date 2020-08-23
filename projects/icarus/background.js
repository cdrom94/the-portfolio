var scene,
    camera,
    renderer,
    cloudParticles = [];

window.addEventListener('resize', onWindowResize, false);

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(320, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.x = 0;
  camera.position.y = 1;
  camera.position.z = 0;
  camera.rotation.x = 1.16;
  camera.rotation.y = -0.12;
  camera.rotation.z = 1;

  // cloud hue
  var ambient = new THREE.AmbientLight(0xffffff, 0.44);
  scene.add(ambient);

  var directional = new THREE.DirectionalLight(0x0000ff);
  directional.position.set(0, 1, 0);
  scene.add(directional);

  var hemLight = new THREE.HemisphereLight(0xffffff, 0xeeeeee, 1);
  scene.add(hemLight);

  renderer = new THREE.WebGLRenderer({
    alpha: true
  });
  scene.fog = new THREE.FogExp2(0x96afca, 0.0022);
  scene.background = new THREE.Color(0x96afca);
  renderer.setClearColor(0x96afca);
  document.body.appendChild(renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);
  var loader = new THREE.TextureLoader();
  loader.load('icarus/cloud_texture.png', function (texture) {
    cloudGeo = new THREE.PlaneBufferGeometry(400, 400);
    cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true
    });
    for (var p = 0; p < 25; p++) {
      var cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(Math.random() * 800 - 400, 500, Math.random() * 500 - 450);
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random() * -60;
      cloud.material.opacity = 0.9;
      cloudParticles.push(cloud);
      scene.add(cloud);
    }
    stopAnimation();
  });

}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
} 
function playAnimation() {
  renderer.setAnimationLoop(
    function animationLoop() {
      update(0.00030);
      render();
  });
}
function stopAnimation() {
  renderer.setAnimationLoop(
  function animationUpdate() {
      update(0);
      render();
  });
}
function update(rotate){
  cloudParticles.forEach(
    function particleUpdate(p){
    p.rotation.z -= rotate;
  });
}
function render(){
  renderer.render(scene, camera);
}