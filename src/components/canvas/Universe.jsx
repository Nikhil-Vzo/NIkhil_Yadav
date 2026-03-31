import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const ProjectPortal = ({ position, title, subtitle, color, urlBase }) => {
  const meshRef = useRef();
  const titleRef = useRef();
  const subRef = useRef();
  const [hovered, setHover] = useState(false);
  const { camera } = useThree();

  useFrame(() => {
    if(!meshRef.current) return;
    
    // Smooth responsive motion
    meshRef.current.rotation.y += 0.01;
    if(hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }

    // Dynamic Opacity based on distance to camera
    // Prevents clipping "mess" by fading out as it gets too close
    const dist = camera.position.distanceTo(meshRef.current.position);
    let targetOpacity = 1;
    
    // If the object is within 3 units of the camera, start fading it out
    if (dist < 4) {
      targetOpacity = Math.max(0, (dist - 1) / 3);
    }

    // Apply exact opacity to materials
    if (meshRef.current.material) {
      meshRef.current.material.transparent = true;
      meshRef.current.material.opacity = THREE.MathUtils.lerp(meshRef.current.material.opacity, targetOpacity, 0.1);
    }
    
    if (titleRef.current) titleRef.current.fillOpacity = THREE.MathUtils.lerp(titleRef.current.fillOpacity, targetOpacity, 0.1);
    if (subRef.current) subRef.current.fillOpacity = THREE.MathUtils.lerp(subRef.current.fillOpacity, targetOpacity, 0.1);
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh 
          ref={meshRef}
          onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor='pointer'; }}
          onPointerOut={(e) => { e.stopPropagation(); setHover(false); document.body.style.cursor='auto'; }}
          onClick={(e) => { e.stopPropagation(); console.log('Transition to', urlBase); }}
        >
          <torusGeometry args={[1.5, 0.2, 16, 100]} />
          <meshStandardMaterial 
            color={color} 
            emissive={hovered ? color : '#000'}
            emissiveIntensity={hovered ? 2 : 0}
            wireframe={true} 
            transparent={true}
          />
          
          <Text
            ref={titleRef}
            position={[0, 0, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
            transparent
          >
            {title}
          </Text>
          <Text
            ref={subRef}
            position={[0, -0.8, 0]}
            fontSize={0.2}
            color="#aaaaaa"
            anchorX="center"
            anchorY="middle"
            transparent
          >
            {subtitle}
          </Text>
        </mesh>
      </Float>
    </group>
  );
};

const CameraManager = () => {
  const scroll = useScroll();
  const { camera } = useThree();

  useFrame(() => {
    // Map scroll progress (0-1) to camera Z position
    // Starting slightly in front of Z=0 to feel immediate movement
    const zPosition = 2 - (scroll.offset * 40);
    camera.position.setZ(THREE.MathUtils.lerp(camera.position.z, zPosition, 0.1));
  });

  return null;
};

const Universe = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#c084fc" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
      
      {/* ScrollControls with optimized pages/damping for better desktop/mobile feel */}
      <ScrollControls pages={6} damping={0.25} distance={1.2}>
        <CameraManager />

        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
          <Text
            position={[0, 1, 0]}
            fontSize={1}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            NIKHIL YADAV
          </Text>
          <Text
            position={[0, 0, 0]}
            fontSize={0.25}
            color="#a1a1aa"
            anchorX="center"
            anchorY="middle"
          >
            SOFTWARE ENGINEER • CREATIVE DEVELOPER
          </Text>
          <Text
            position={[0, -1, 0]}
            fontSize={0.15}
            color="#555"
            anchorX="center"
            anchorY="middle"
          >
            (SCROLL TO EXPLORE THE MULTIVERSE)
          </Text>
        </Float>

        <ProjectPortal position={[-3, -1, -8]} title="OTHER HALF" subtitle="Campus Social Platform" color="#aa3bff" urlBase="other-half" />
        <ProjectPortal position={[3, 1, -16]} title="TEDX AUC" subtitle="Event Booking Architecture" color="#3b82f6" urlBase="tedx-auc" />
        <ProjectPortal position={[-2, -2, -24]} title="GUIDELY" subtitle="Career Guidance Algorithm" color="#10b981" urlBase="guidely" />
        <ProjectPortal position={[2, 0, -32]} title="FEST" subtitle="Dynamic Zone System" color="#f43f5e" urlBase="fest-platform" />
        
        <fog attach="fog" args={['#030303', 5, 20]} />
      </ScrollControls>
    </>
  );
};

export default Universe;
