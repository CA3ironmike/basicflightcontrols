// realistic.js

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);  // Sky blue background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;  // Enable shadows
document.body.appendChild(renderer.domElement);


// Add ground, lights, etc. (same as before)
// Animation loop (same as before)

animate();  // Start the animation

// Add ground with texture
const groundTexture = new THREE.TextureLoader().load('Chip005_1K-JPG_Color.jpg');
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(10, 10);
const groundMaterial = new THREE.MeshPhongMaterial({ map: groundTexture });
const ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), groundMaterial);
ground.rotation.x = -Math.PI / 2;  // Make the ground horizontal
ground.receiveShadow = true;  // Ground can receive shadows
scene.add(ground);

// Add a light source to simulate sunlight
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10);
directionalLight.castShadow = true;  // Light will cast shadows
scene.add(directionalLight);

// Add ambient light for soft light fill
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

// Create a cube (drone) to simulate moving
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0xff6347 });
const drone = new THREE.Mesh(geometry, material);
drone.castShadow = true;  // Cube will cast a shadow
scene.add(drone);

// Set initial camera and drone positions
camera.position.set(5, 5, 10);
drone.position.set(0, 1, 0);  // Start the drone above the ground

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Move the drone forward along the z-axis
    drone.position.z -= 0.05;
    camera.position.z = drone.position.z + 5;  // Camera follows the drone

    renderer.render(scene, camera);
}
animate();
