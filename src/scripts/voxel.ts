/* 3D-сцена «lost programmer» на главной: модель крутится при загрузке и дальше
   вращается сама, её можно покрутить мышью. three.js грузится отдельным
   чанком уже после отрисовки страницы. Перенесено из components/voxel.js. */

function easeOutCirc(x: number): number {
  return Math.sqrt(1 - Math.pow(x - 1, 4));
}

async function mount(container: HTMLElement): Promise<void> {
  const [THREE, { OrbitControls }, { GLTFLoader }] = await Promise.all([
    import('three'),
    import('three/examples/jsm/controls/OrbitControls.js'),
    import('three/examples/jsm/loaders/GLTFLoader.js'),
  ]);

  const width = container.clientWidth;
  const height = container.clientHeight;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const target = new THREE.Vector3(-0.5, 1.2, 0);
  const initial = new THREE.Vector3(20 * Math.sin(0.2 * Math.PI), 10, 20 * Math.cos(0.2 * Math.PI));
  const scale = height * 0.0001 + 4.8;
  const camera = new THREE.OrthographicCamera(-scale, scale, scale, -scale, 0.1, 50000);
  camera.position.copy(initial);
  camera.lookAt(target);
  scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.target = target;

  const gltf = await new GLTFLoader().loadAsync(container.dataset.model!);
  scene.add(gltf.scene);
  container.classList.add('voxel--ready');

  let frame = 0;
  const animate = () => {
    requestAnimationFrame(animate);
    frame = frame <= 100 ? frame + 1 : frame;
    if (frame <= 100) {
      const rot = -easeOutCirc(frame / 120) * Math.PI * 20;
      camera.position.y = -100;
      camera.position.x = initial.x * Math.cos(rot) + initial.z * Math.sin(rot);
      camera.position.z = initial.z * Math.cos(rot) - initial.x * Math.sin(rot);
      camera.lookAt(target);
    } else {
      controls.update();
    }
    renderer.render(scene, camera);
  };
  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

document.querySelectorAll<HTMLElement>('[data-voxel]').forEach((container) => {
  mount(container).catch(() => container.classList.add('voxel--ready'));
});
