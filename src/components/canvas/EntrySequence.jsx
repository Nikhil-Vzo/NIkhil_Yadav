import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store';
import { MathUtils } from 'three';

const EntrySequence = () => {
  const meshRef = useRef();
  const setPhase = useStore((state) => state.setPhase);
  const [hovered, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Base floating animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.5;

    // Smooth hover scaling
    const targetScale = hovered ? 1.5 : 1;
    const currentScale = meshRef.current.scale.x;
    const newScale = MathUtils.lerp(currentScale, targetScale, 0.1);
    meshRef.current.scale.set(newScale, newScale, newScale);

    // Click transition animation (Explosion mapping)
    if (clicked) {
      meshRef.current.scale.x += delta * 50;
      meshRef.current.scale.y += delta * 50;
      meshRef.current.scale.z += delta * 50;
      
      // If scale is massive enough to cover camera, switch to universe
      if (meshRef.current.scale.x > 30) {
        setPhase('universe');
      }
    }
  });

  const handleClick = () => {
    if(clicked) return;
    setClicked(true);
    // Ideally play deep pulse audio here.
  };

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={hovered ? 5 : 1} color="#c084fc" />
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial 
          color={hovered ? "#ffffff" : "#c084fc"} 
          wireframe={!hovered}
        />
      </mesh>
    </>
  );
};

export default EntrySequence;
