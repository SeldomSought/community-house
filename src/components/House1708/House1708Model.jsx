import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html, useTexture, Plane } from '@react-three/drei';
import * as THREE from 'three';

// House 1708 Configuration - Based on detailed floor plan
const HOUSE_1708_CONFIG = {
  // Building positioned at origin for focused view
  position: [0, 0, 0],
  
  // Ground Floor (Floor 1)
  groundFloor: {
    height: 2.8,
    rooms: [
      {
        name: 'Dining Room',
        bounds: { x: [-2, 0], z: [1, 3] },
        color: '#f4e4c9',
        type: 'dining'
      },
      {
        name: 'Kitchen',
        bounds: { x: [0, 2], z: [1, 3] },
        color: '#e8dcc6',
        type: 'kitchen'
      },
      {
        name: 'Bedroom 1',
        bounds: { x: [-3, -1], z: [-1, 2] },
        color: '#d6c7b7',
        type: 'bedroom'
      },
      {
        name: 'Bathroom 1',
        bounds: { x: [-1.5, -0.5], z: [-1, 0] },
        color: '#c4d4e6',
        type: 'bathroom'
      }
    ]
  },
  
  // Second Floor (Floor 2) 
  secondFloor: {
    height: 2.8,
    yOffset: 2.8,
    rooms: [
      {
        name: 'Conservatory',
        bounds: { x: [-2.5, -0.5], z: [0, 2.5] },
        color: '#e6f3e6',
        type: 'conservatory'
      },
      {
        name: 'Bedroom 2',
        bounds: { x: [0, 2], z: [-1, 1] },
        color: '#d6c7b7',
        type: 'bedroom'
      },
      {
        name: 'Bedroom 3',
        bounds: { x: [-1, 1], z: [-2, 0] },
        color: '#d6c7b7', 
        type: 'bedroom'
      },
      {
        name: 'Bathroom 2',
        bounds: { x: [1, 2], z: [-2, -1] },
        color: '#c4d4e6',
        type: 'bathroom'
      }
    ]
  },
  
  // Third Floor (Floor 3)
  thirdFloor: {
    height: 2.4,
    yOffset: 5.6,
    rooms: [
      {
        name: 'Guest Loft',
        bounds: { x: [-1.5, 1.5], z: [-0.5, 1.5] },
        color: '#f0e6d2',
        type: 'loft'
      }
    ]
  },
  
  // Sun Room (separate structure)
  sunRoom: {
    position: [-4, 0, 2],
    dimensions: [1.5, 2.2, 1.8],
    color: '#e0f7fa',
    hasHotTub: true
  }
};

// Individual Room Component
function Room({ room, floorY, onHover, isHovered }) {
  const meshRef = useRef();
  const { bounds, color, name, type } = room;
  
  // Calculate room dimensions and position
  const width = bounds.x[1] - bounds.x[0];
  const depth = bounds.z[1] - bounds.z[0];
  const centerX = (bounds.x[0] + bounds.x[1]) / 2;
  const centerZ = (bounds.z[0] + bounds.z[1]) / 2;
  
  // Room-specific height variations
  const roomHeight = type === 'bathroom' ? 2.4 : 
                    type === 'loft' ? 2.8 : 2.6;
  
  useFrame((state) => {
    if (meshRef.current && isHovered) {
      meshRef.current.position.y = floorY + roomHeight/2 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    } else if (meshRef.current) {
      meshRef.current.position.y = floorY + roomHeight/2;
    }
  });
  
  return (
    <group>
      {/* Room floor */}
      <mesh 
        position={[centerX, floorY + 0.05, centerZ]}
        onPointerEnter={() => onHover(name)}
        onPointerLeave={() => onHover(null)}
      >
        <boxGeometry args={[width, 0.1, depth]} />
        <meshLambertMaterial color={isHovered ? '#fff3cd' : color} />
      </mesh>
      
      {/* Room walls */}
      <mesh 
        ref={meshRef}
        position={[centerX, floorY + roomHeight/2, centerZ]}
        onPointerEnter={() => onHover(name)}
        onPointerLeave={() => onHover(null)}
      >
        <boxGeometry args={[width - 0.1, roomHeight, depth - 0.1]} />
        <meshLambertMaterial 
          color={isHovered ? '#ffffff' : color} 
          transparent 
          opacity={isHovered ? 0.9 : 0.7}
        />
      </mesh>
      
      {/* Room label */}
      {isHovered && (
        <Html position={[centerX, floorY + roomHeight + 0.5, centerZ]}>
          <div style={{
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            fontFamily: "'Inter', sans-serif"
          }}>
            {name}
          </div>
        </Html>
      )}
    </group>
  );
}

// Floor Structure Component  
function FloorStructure({ floorConfig, floorNumber, hoveredRoom, onRoomHover }) {
  const { rooms, height, yOffset = 0 } = floorConfig;
  
  return (
    <group>
      {/* Floor slab */}
      <mesh position={[0, yOffset, 0]}>
        <boxGeometry args={[6, 0.2, 5]} />
        <meshLambertMaterial color="#8d8d8d" />
      </mesh>
      
      {/* Rooms */}
      {rooms.map((room, index) => (
        <Room 
          key={`floor-${floorNumber}-room-${index}`}
          room={room}
          floorY={yOffset}
          onHover={onRoomHover}
          isHovered={hoveredRoom === room.name}
        />
      ))}
      
      {/* Floor number label */}
      <Text
        position={[3, yOffset + height/2, 0]}
        fontSize={0.3}
        color="#666"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI/2, 0]}
      >
        Floor {floorNumber}
      </Text>
    </group>
  );
}

// Sun Room Component
function SunRoom({ config, hoveredRoom, onRoomHover }) {
  const { position, dimensions, color, hasHotTub } = config;
  const [width, height, depth] = dimensions;
  
  return (
    <group position={position}>
      {/* Sun room structure */}
      <mesh 
        position={[0, height/2, 0]}
        onPointerEnter={() => onRoomHover('Sun Room - Hot Tub')}
        onPointerLeave={() => onRoomHover(null)}
      >
        <boxGeometry args={[width, height, depth]} />
        <meshLambertMaterial 
          color={hoveredRoom === 'Sun Room - Hot Tub' ? '#ffffff' : color}
          transparent 
          opacity={0.8} 
        />
      </mesh>
      
      {/* Hot tub */}
      {hasHotTub && (
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.4, 8]} />
          <meshLambertMaterial color="#4fc3f7" />
        </mesh>
      )}
      
      {/* Glass roof effect */}
      <mesh position={[0, height + 0.1, 0]}>
        <boxGeometry args={[width + 0.1, 0.05, depth + 0.1]} />
        <meshLambertMaterial color="#81c784" transparent opacity={0.6} />
      </mesh>
      
      {hoveredRoom === 'Sun Room - Hot Tub' && (
        <Html position={[0, height + 1, 0]}>
          <div style={{
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            fontFamily: "'Inter', sans-serif"
          }}>
            Sun Room with Hot Tub
          </div>
        </Html>
      )}
    </group>
  );
}

// Main Building Component
function House1708({ config, hoveredRoom, onRoomHover }) {
  const buildingRef = useRef();
  
  // Subtle building animation
  useFrame((state) => {
    if (buildingRef.current) {
      buildingRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });
  
  return (
    <group ref={buildingRef} position={config.position}>
      {/* External building shell */}
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[6.2, 8.2, 5.2]} />
        <meshLambertMaterial color="#f5f5dc" transparent opacity={0.1} />
      </mesh>
      
      {/* Ground Floor */}
      <FloorStructure 
        floorConfig={config.groundFloor}
        floorNumber={1}
        hoveredRoom={hoveredRoom}
        onRoomHover={onRoomHover}
      />
      
      {/* Second Floor */}
      <FloorStructure 
        floorConfig={config.secondFloor}
        floorNumber={2}
        hoveredRoom={hoveredRoom}
        onRoomHover={onRoomHover}
      />
      
      {/* Third Floor */}
      <FloorStructure 
        floorConfig={config.thirdFloor}
        floorNumber={3}
        hoveredRoom={hoveredRoom}
        onRoomHover={onRoomHover}
      />
      
      {/* Roof */}
      <mesh position={[0, 8.5, 0]}>
        <boxGeometry args={[6.4, 0.3, 5.4]} />
        <meshLambertMaterial color="#8b4513" />
      </mesh>
      
      {/* House number */}
      <Text
        position={[0, 1, 3]}
        fontSize={0.8}
        color="#2c3e50"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        1708
      </Text>
    </group>
  );
}

// Ground plane
function ArchitecturalGround() {
  return (
    <group>
      {/* Main ground plane */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[15, 12]} />
        <meshLambertMaterial color="#4a7c3a" />
      </mesh>
      
      {/* Property lines */}
      <mesh position={[0, -0.05, 0]}>
        <ringGeometry args={[6, 6.1, 4]} />
        <meshBasicMaterial color="#ff6b6b" />
      </mesh>
    </group>
  );
}

// Info Panel Component
function InfoPanel({ hoveredRoom }) {
  return (
    <Html position={[5, 6, 0]}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,240,240,0.9) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: '16px',
        padding: '24px',
        minWidth: '280px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        fontFamily: "'Inter', sans-serif"
      }}>
        <h2 style={{ 
          margin: '0 0 16px 0', 
          color: '#2c3e50',
          fontSize: '20px',
          fontWeight: '600'
        }}>
          House 1708
        </h2>
        
        <div style={{ marginBottom: '16px' }}>
          <div style={{ 
            fontSize: '14px', 
            color: '#7f8c8d',
            marginBottom: '8px' 
          }}>
            Multi-Story Residence
          </div>
          
          <div style={{ fontSize: '12px', color: '#95a5a6' }}>
            <strong>Floor 1:</strong> Dining, Kitchen, Bedroom + Bath<br/>
            <strong>Floor 2:</strong> Conservatory, 2 Bedrooms + Bath<br/>
            <strong>Floor 3:</strong> Guest Loft<br/>
            <strong>Amenity:</strong> Sun Room with Hot Tub
          </div>
        </div>
        
        {hoveredRoom && (
          <div style={{
            background: 'rgba(76, 175, 80, 0.1)',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid rgba(76, 175, 80, 0.3)'
          }}>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '500',
              color: '#4caf50',
              marginBottom: '4px'
            }}>
              Currently Viewing:
            </div>
            <div style={{ fontSize: '16px', color: '#2c3e50' }}>
              {hoveredRoom}
            </div>
          </div>
        )}
        
        <div style={{ 
          marginTop: '16px',
          fontSize: '11px', 
          color: '#bdc3c7',
          borderTop: '1px solid #ecf0f1',
          paddingTop: '12px'
        }}>
          Hover over rooms to explore • Drag to rotate
        </div>
      </div>
    </Html>
  );
}

// Main Component
export default function House1708Model() {
  const [hoveredRoom, setHoveredRoom] = useState(null);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '500px',
      background: 'linear-gradient(135deg, #87ceeb 0%, #b8d8f0 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      position: 'relative'
    }}>
      <Canvas
        camera={{
          position: [10, 8, 10],
          fov: 45
        }}
        shadows
        gl={{ antialias: true, alpha: false }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[15, 20, 10]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
        />

        {/* Rim lighting */}
        <directionalLight
          position={[-10, 5, -5]}
          intensity={0.3}
          color="#ffa726"
        />

        {/* Ground */}
        <ArchitecturalGround />

        {/* Main House */}
        <House1708
          config={HOUSE_1708_CONFIG}
          hoveredRoom={hoveredRoom}
          onRoomHover={setHoveredRoom}
        />

        {/* Sun Room */}
        <SunRoom
          config={HOUSE_1708_CONFIG.sunRoom}
          hoveredRoom={hoveredRoom}
          onRoomHover={setHoveredRoom}
        />

        {/* Info Panel */}
        <InfoPanel hoveredRoom={hoveredRoom} />

        {/* Camera Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI * 0.48}
          minDistance={6}
          maxDistance={25}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* UI Overlay */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        background: 'rgba(0,0,0,0.75)',
        color: 'white',
        padding: '10px 14px',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: '500',
        zIndex: 10
      }}>
        House 1708 - Interactive 3D Floor Plan
      </div>
    </div>
  );
}
