import React, { useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

interface ModelViewerProps {
  modelPath?: string;
  height?: string;
}

function ModelViewerInner({ modelPath = '/models/community-site-scene.glb', height = '520px' }: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelUrl = useBaseUrl(modelPath);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;
    let renderer: any;
    let animationId: number;

    const init = async () => {
      try {
        // Dynamic imports for Three.js (SSR-safe)
        const THREE = await import('three');
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');

        if (!mounted || !containerRef.current) return;

        const el = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf6f7f9);

        const camera = new THREE.PerspectiveCamera(
          45,
          el.clientWidth / el.clientHeight,
          0.1,
          500
        );
        camera.position.set(35, 22, 55);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(el.clientWidth, el.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        el.appendChild(renderer.domElement);

        // Lighting
        scene.add(new THREE.HemisphereLight(0xffffff, 0x333333, 1.0));
        const dir = new THREE.DirectionalLight(0xffffff, 0.9);
        dir.position.set(60, 80, 40);
        scene.add(dir);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.target.set(-5, 5, 0);
        controls.minDistance = 20;
        controls.maxDistance = 140;
        controls.maxPolarAngle = Math.PI * 0.48;

        // Load model
        const loader = new GLTFLoader();
        loader.load(
          modelUrl,
          (gltf) => {
            if (!mounted) return;
            const root = gltf.scene;
            scene.add(root);

            // Auto-frame model
            const box = new THREE.Box3().setFromObject(root);
            const size = box.getSize(new THREE.Vector3()).length();
            const center = box.getCenter(new THREE.Vector3());
            controls.target.copy(center);
            camera.position.copy(center).add(
              new THREE.Vector3(size * 0.55, size * 0.25, size * 0.75)
            );
            camera.near = size / 200;
            camera.far = size * 10;
            camera.updateProjectionMatrix();

            setIsLoading(false);
          },
          undefined,
          (err) => {
            console.error('Error loading model:', err);
            setError('Failed to load 3D model');
            setIsLoading(false);
          }
        );

        // Handle resize
        const onResize = () => {
          if (!containerRef.current) return;
          camera.aspect = el.clientWidth / el.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(el.clientWidth, el.clientHeight);
        };
        window.addEventListener('resize', onResize);

        // Animation loop
        const animate = () => {
          animationId = requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();

        // Cleanup function
        return () => {
          window.removeEventListener('resize', onResize);
          cancelAnimationFrame(animationId);
          renderer.dispose();
          if (el.contains(renderer.domElement)) {
            el.removeChild(renderer.domElement);
          }
        };
      } catch (err) {
        console.error('Error initializing 3D viewer:', err);
        setError('Failed to initialize 3D viewer');
        setIsLoading(false);
      }
    };

    const cleanup = init();

    return () => {
      mounted = false;
      cleanup?.then((fn) => fn?.());
      if (renderer && containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl]);

  return (
    <div className={styles.wrapper}>
      <div
        ref={containerRef}
        className={styles.viewer}
        style={{ height }}
      >
        {isLoading && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <span>Loading 3D model...</span>
          </div>
        )}
        {error && (
          <div className={styles.error}>
            <span>{error}</span>
          </div>
        )}
      </div>
      <p className={styles.hint}>
        Drag to rotate • Scroll to zoom • Right-click to pan
      </p>
    </div>
  );
}

export default function ModelViewer(props: ModelViewerProps) {
  return (
    <BrowserOnly fallback={
      <div className={styles.wrapper}>
        <div className={styles.viewer} style={{ height: props.height || '520px' }}>
          <div className={styles.loading}>
            <span>Loading 3D viewer...</span>
          </div>
        </div>
      </div>
    }>
      {() => <ModelViewerInner {...props} />}
    </BrowserOnly>
  );
}
