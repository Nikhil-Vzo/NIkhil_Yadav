import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import { BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing';
import { useMemo } from 'react';

const PostProcessingLayer = () => {
  // Very simplistic mobile detection to reduce effect strain
  const isMobile = useMemo(() => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), []);

  if (isMobile) {
    // Return empty or very cheap effects for mobile
    return null;
  }

  return (
    <EffectComposer disableNormalPass multisampling={0}>
      <Bloom 
        intensity={1.5} 
        luminanceThreshold={0.1} 
        luminanceSmoothing={0.9} 
        kernelSize={KernelSize.HUGE} 
      />
      <Noise opacity={0.3} />
    </EffectComposer>
  );
};

export default PostProcessingLayer;
