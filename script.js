function scrollToAboutMe() {
  const target = document.getElementById('about');
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const duration = 1500;
  let start = null;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const yOffset = Math.min(progress / duration * targetPosition, targetPosition);
    window.scrollTo(0, yOffset);
    if (progress < duration) window.requestAnimationFrame(step);
  });
}

function scrollToContacts() {
  const target = document.getElementById('contacts');
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const duration = 1500;
  let start = null;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const yOffset = Math.min(progress / duration * targetPosition, targetPosition);
    window.scrollTo(0, yOffset);
    if (progress < duration) window.requestAnimationFrame(step);
  });
}

document.getElementById('header-contacts-link').addEventListener('click', scrollToContacts);

//fade in scroll
const fadeInElements = document.querySelectorAll('.fade-in-on-scroll');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.1
});

fadeInElements.forEach(el => {
  observer.observe(el);
});

let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    header.style.top = '-60px';
  } else {
    header.style.top = '0';
  }
  lastScrollTop = scrollTop;
});

const mainProjectImg = document.querySelectorAll('.main-project-img');

const observerr = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.1
});

mainProjectImg.forEach(er => {
  observerr.observe(er);
});

//popup logic
const popupBtn = document.getElementById('popup-projects-btn');
const popup = document.querySelector('.popup-show');
const popupContent = document.querySelector('.popup-content');
const closePopup = document.querySelector('.close-popup');

popupBtn.addEventListener('click', function (event) {
  event.stopPropagation();
  popup.classList.add('active');
});

closePopup.addEventListener('click', function (event) {
  event.stopPropagation();
  popup.classList.remove('active');
});

document.addEventListener('click', function (event) {
  if (popup.classList.contains('active') && !popupContent.contains(event.target) && event.target !== popupBtn) {
    popup.classList.remove('active');
  }
});

popupContent.addEventListener('click', function (event) {
  event.stopPropagation();
});

// Letter R Animation
const circleCanvas = document.getElementById('circle-canvas');
const circleRenderer = new THREE.WebGLRenderer({ canvas: circleCanvas, alpha: true });
circleRenderer.setSize(window.innerWidth, window.innerHeight);
const circleScene = new THREE.Scene();
const circleCamera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
circleCamera.position.z = 5;

const staticCircleGeometry = new THREE.RingGeometry(2.5, 2.51, 84);
const staticCircleMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.6,
  side: THREE.DoubleSide
});
const staticCircle = new THREE.Mesh(staticCircleGeometry, staticCircleMaterial);
circleScene.add(staticCircle);

let circleMeshes = [];

function createExpandingCircle() {
  const dynamicCircleGeometry = new THREE.RingGeometry(2.5, 2.52, 84);
  const dynamicCircleMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide
  });

  const dynamicCircle = new THREE.Mesh(dynamicCircleGeometry, dynamicCircleMaterial);
  circleScene.add(dynamicCircle);
  circleMeshes.push(dynamicCircle);
}

function animateCircles() {
  for (let i = 0; i < circleMeshes.length; i++) {
    const circle = circleMeshes[i];
    circle.scale.x += 0.001;
    circle.scale.y += 0.001;
    circle.material.opacity -= 0.0025;

    if (circle.material.opacity <= 0) {
      circleScene.remove(circle);
      circleMeshes.splice(i, 1);
      i--;
    }
  }
}

function animateCircleScene() {
  requestAnimationFrame(animateCircleScene);
  animateCircles();
  circleRenderer.render(circleScene, circleCamera);
}

setInterval(createExpandingCircle, 2000);
animateCircleScene();

// Letter R Scene Setup
const letterCanvas = document.getElementById('letter-canvas');
const letterScene = new THREE.Scene();
const letterCamera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
letterCamera.position.z = 5;

const letterRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
letterRenderer.setSize(window.innerWidth, window.innerHeight);
letterCanvas.appendChild(letterRenderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
letterScene.add(ambientLight);

const redLight = new THREE.PointLight(0xff0000, 2.5, 100);
redLight.position.set(5, 5, 5);
letterScene.add(redLight);

const greenLight = new THREE.PointLight(0x6b5e86, 1.5, 100);
greenLight.position.set(-5, -5, 5);
letterScene.add(greenLight);

const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  const textGeometry = new THREE.TextGeometry('R', {
    font: font,
    size: 2,
    height: 0.5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelOffset: 0,
    bevelSegments: 5
  });

  textGeometry.center();

  const material = new THREE.MeshPhysicalMaterial({
    color: 0x52585c,
    roughness: 0.5,
    metalness: 0.9,
    transmission: 0.7,
    transparent: true,
    opacity: 0.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 0.9,
  });

  const letterMesh = new THREE.Mesh(textGeometry, material);
  letterScene.add(letterMesh);

  const controls = new THREE.OrbitControls(letterCamera, letterRenderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.001;
  controls.enableZoom = false;

  function animateLetterScene() {
    requestAnimationFrame(animateLetterScene);

    letterMesh.rotation.y += 0.003;
    letterMesh.rotation.x = Math.sin(Date.now() * 0.001) * 0.2;

    controls.update();
    letterRenderer.render(letterScene, letterCamera);
  }

  animateLetterScene();
});

// Function to adjust for screen size
function adjustForScreenSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Adjust camera position and settings based on window size
  if (width < 768) {
    letterCamera.fov = 75; // Adjust field of view for smaller screens
    letterCamera.position.z = 7; // Bring the camera closer for mobile view
    circleCamera.position.z = 12; // Adjust circle camera position for mobile
  } else if (width < 1366) {
    letterCamera.fov = 65; // Adjust field of view for medium screens
    letterCamera.position.z = 6; // Moderate camera distance for tablets
    circleCamera.position.z = 10; // Adjust circle camera position for medium screens
  } else {
    letterCamera.fov = 55; // Regular field of view for larger screens
    letterCamera.position.z = 5; // Regular camera distance
    circleCamera.position.z = 5; // Regular circle camera position
  }

  // Update render sizes and camera aspect ratios
  circleRenderer.setSize(width, height);
  circleCamera.aspect = width / height;
  circleCamera.updateProjectionMatrix();

  letterRenderer.setSize(width, height);
  letterCamera.aspect = width / height;
  letterCamera.updateProjectionMatrix();
}

// Call the function on load
adjustForScreenSize();
// Call the function on resize
window.addEventListener('resize', adjustForScreenSize);



