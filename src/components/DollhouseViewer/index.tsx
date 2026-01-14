import React, { useRef, useEffect, useState, useCallback } from 'react';
import { rooms, aerial, RoomConfig } from '@site/src/data/rooms';
import RoomModal from './RoomModal';
import styles from './styles.module.css';

// Three.js imports - loaded dynamically for SSR compatibility
let THREE: typeof import('three') | null = null;
let OrbitControls: any = null;

interface DollhouseViewerProps {
  onRoomSelect?: (room: RoomConfig | null) => void;
}

type FloorFilter = 'all' | 1 | 2;

export default function DollhouseViewer({ onRoomSelect }: DollhouseViewerProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<any>(null);
  const sceneRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);
  const roomMeshesRef = useRef<Map<string, any>>(new Map());
  const labelsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const animationFrameRef = useRef<number>();

  const [isLoaded, setIsLoaded] = useState(false);
  const [floorFilter, setFloorFilter] = useState<FloorFilter>('all');
  const [explodeAmount, setExplodeAmount] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<RoomConfig | null>(null);
  const [showAerial, setShowAerial] = useState(false);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  // Load Three.js dynamically (for SSR compatibility)
  useEffect(() => {
    const loadThree = async () => {
      if (typeof window === 'undefined') return;

      const threeModule = await import('three');
      THREE = threeModule;

      const { OrbitControls: OC } = await import('three/examples/jsm/controls/OrbitControls.js');
      OrbitControls = OC;

      setIsLoaded(true);
    };

    loadThree();
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!isLoaded || !containerRef.current || !THREE) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    sceneRef.current = scene;

    // Camera - isometric-ish perspective
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(15, 15, 15);
    camera.lookAt(4, 0, 3);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 8;
    controls.maxDistance = 40;
    controls.maxPolarAngle = Math.PI / 2 - 0.1; // Don't go below floor
    controls.target.set(4, 2, 3);
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d3748,
      side: THREE.DoubleSide,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    scene.add(ground);

    // Create room meshes
    createRoomMeshes(scene);

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        Array.from(roomMeshesRef.current.values())
      );

      if (intersects.length > 0) {
        const roomId = (intersects[0].object as any).userData.roomId;
        setHoveredRoom(roomId);
        container.style.cursor = 'pointer';
      } else {
        setHoveredRoom(null);
        container.style.cursor = 'grab';
      }
    };

    const onClick = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        Array.from(roomMeshesRef.current.values())
      );

      if (intersects.length > 0) {
        const roomId = (intersects[0].object as any).userData.roomId;
        const room = rooms.find(r => r.id === roomId);
        if (room) {
          setSelectedRoom(room);
          onRoomSelect?.(room);
        }
      }
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('click', onClick);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      controls.update();
      updateLabels();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('click', onClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      renderer.dispose();
      container.removeChild(renderer.domElement);
      // Clean up labels
      labelsRef.current.forEach(label => label.remove());
      labelsRef.current.clear();
    };
  }, [isLoaded, onRoomSelect]);

  // Create room meshes
  const createRoomMeshes = useCallback((scene: any) => {
    if (!THREE) return;

    roomMeshesRef.current.forEach(mesh => scene.remove(mesh));
    roomMeshesRef.current.clear();
    labelsRef.current.forEach(label => label.remove());
    labelsRef.current.clear();

    rooms.forEach(room => {
      const height = 0.8;
      const geometry = new THREE.BoxGeometry(room.size.w, height, room.size.d);

      const color = new THREE.Color(room.color || '#4a5568');
      const material = new THREE.MeshStandardMaterial({
        color: color,
        transparent: true,
        opacity: 0.85,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.roomId = room.id;
      mesh.userData.originalPosition = {
        x: room.position.x + room.size.w / 2,
        y: (room.floor - 1) * 1.5 + height / 2,
        z: room.position.z + room.size.d / 2,
      };

      mesh.position.set(
        mesh.userData.originalPosition.x,
        mesh.userData.originalPosition.y,
        mesh.userData.originalPosition.z
      );

      // Add edges for better visibility
      const edges = new THREE.EdgesGeometry(geometry);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true });
      const wireframe = new THREE.LineSegments(edges, lineMaterial);
      mesh.add(wireframe);

      scene.add(mesh);
      roomMeshesRef.current.set(room.id, mesh);

      // Create label
      if (containerRef.current) {
        const label = document.createElement('div');
        label.className = styles.roomLabel;
        label.textContent = room.name;
        label.dataset.roomId = room.id;
        containerRef.current.appendChild(label);
        labelsRef.current.set(room.id, label);
      }
    });
  }, []);

  // Update label positions
  const updateLabels = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current || !containerRef.current || !THREE) return;

    const camera = cameraRef.current;
    const container = containerRef.current;

    labelsRef.current.forEach((label, roomId) => {
      const mesh = roomMeshesRef.current.get(roomId);
      if (!mesh) return;

      const vector = new THREE.Vector3();
      vector.setFromMatrixPosition(mesh.matrixWorld);
      vector.y += 0.6;
      vector.project(camera);

      const x = (vector.x * 0.5 + 0.5) * container.clientWidth;
      const y = (-vector.y * 0.5 + 0.5) * container.clientHeight;

      label.style.left = `${x}px`;
      label.style.top = `${y}px`;

      // Hide if behind camera
      if (vector.z > 1) {
        label.style.display = 'none';
      } else {
        label.style.display = 'block';
      }
    });
  }, []);

  // Update floor visibility
  useEffect(() => {
    roomMeshesRef.current.forEach((mesh, roomId) => {
      const room = rooms.find(r => r.id === roomId);
      if (!room) return;

      const visible = floorFilter === 'all' || room.floor === floorFilter;
      mesh.visible = visible;

      const label = labelsRef.current.get(roomId);
      if (label) {
        label.style.display = visible ? 'block' : 'none';
      }
    });
  }, [floorFilter]);

  // Update explode effect
  useEffect(() => {
    if (!THREE) return;

    roomMeshesRef.current.forEach((mesh, roomId) => {
      const room = rooms.find(r => r.id === roomId);
      if (!room || !mesh.userData.originalPosition) return;

      const orig = mesh.userData.originalPosition;
      const centerX = 4;
      const centerZ = 3;

      const dirX = orig.x - centerX;
      const dirZ = orig.z - centerZ;
      const dist = Math.sqrt(dirX * dirX + dirZ * dirZ);

      if (dist > 0) {
        const explodeFactor = explodeAmount * 2;
        mesh.position.x = orig.x + (dirX / dist) * explodeFactor;
        mesh.position.z = orig.z + (dirZ / dist) * explodeFactor;
      }

      // Also separate floors vertically
      const floorOffset = room.floor === 2 ? explodeAmount * 1.5 : 0;
      mesh.position.y = orig.y + floorOffset;
    });
  }, [explodeAmount]);

  // Update hover effect
  useEffect(() => {
    if (!THREE) return;

    roomMeshesRef.current.forEach((mesh, roomId) => {
      const material = mesh.material as any;
      if (roomId === hoveredRoom) {
        material.emissive = new THREE.Color(0x444444);
      } else {
        material.emissive = new THREE.Color(0x000000);
      }
    });
  }, [hoveredRoom]);

  const handleCloseModal = () => {
    setSelectedRoom(null);
    setShowAerial(false);
    onRoomSelect?.(null);
  };

  return (
    <div className={styles.container}>
      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>Floor</span>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.controlButton} ${floorFilter === 'all' ? styles.active : ''}`}
              onClick={() => setFloorFilter('all')}
            >
              All
            </button>
            <button
              className={`${styles.controlButton} ${floorFilter === 1 ? styles.active : ''}`}
              onClick={() => setFloorFilter(1)}
            >
              Floor 1
            </button>
            <button
              className={`${styles.controlButton} ${floorFilter === 2 ? styles.active : ''}`}
              onClick={() => setFloorFilter(2)}
            >
              Floor 2
            </button>
          </div>
        </div>

        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>Explode</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={explodeAmount}
            onChange={(e) => setExplodeAmount(parseFloat(e.target.value))}
            className={styles.slider}
          />
        </div>

        <button
          className={`${styles.controlButton} ${styles.aerialButton}`}
          onClick={() => setShowAerial(true)}
        >
          Site View
        </button>
      </div>

      {/* 3D Viewer */}
      <div ref={containerRef} className={styles.viewer}>
        {!isLoaded && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <span>Loading 3D viewer...</span>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className={styles.instructions}>
        <span>Drag to rotate</span>
        <span>Scroll to zoom</span>
        <span>Click room to view photos</span>
      </div>

      {/* Room Modal */}
      {selectedRoom && (
        <RoomModal
          room={selectedRoom}
          onClose={handleCloseModal}
        />
      )}

      {/* Aerial Modal */}
      {showAerial && (
        <RoomModal
          room={{
            id: aerial.id,
            name: aerial.name,
            floor: 1,
            position: { x: 0, z: 0 },
            size: { w: 0, d: 0 },
            primaryImage: aerial.images[0],
            images: aerial.images,
          }}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
