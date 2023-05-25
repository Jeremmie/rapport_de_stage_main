import { Canvas, useFrame } from "@react-three/fiber";
import React from "react";
import { useMediaQuery } from 'react-responsive'
import { ScrollControls, useScroll, Loader, Sky, Stars } from "@react-three/drei";

import flyThroughState from "./fly.json"
/* import { useControls } from 'leva' */
import { getProject, val } from "@theatre/core";
import {
  SheetProvider,
  useCurrentSheet,
  PerspectiveCamera
} from "@theatre/r3f";
import Tower from './components/tower.jsx'
import Dunk from './components/Dunk.jsx'
import Robot from './components/Robot.jsx'


export default function App() {
    /**
     * Debug pannel
     */
    /* const {PerspectiveCamera} = useControls('Camera',{
      PerspectiveCamera: true
  }) */

    const sheet = getProject("Fly Through", {state: flyThroughState}).sheet("Scene");

    function Scene() {
    const sheet = useCurrentSheet();
    const scroll = useScroll();
  
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})
  
    
    // our callback will run on every animation frame
    useFrame(() => {
      // the length of our sequence
      const sequenceLength = val(sheet.sequence.pointer.length);
      // update the "position" of the playhead in the sequence, as a fraction of its whole length
      sheet.sequence.position = scroll.offset * sequenceLength;
    });
  
    return <>
      {isDesktopOrLaptop &&
       <PerspectiveCamera
                  theatreKey="Camera"
                  makeDefault
                  fov={60}
                  near={0.1}
                  
                />
      }
     
      {isTabletOrMobile && 
        <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        fov={120}
        near={0.1}
        
      />
      
      }
    </>
  }

  
  return (
    <>
    <Loader />
    <Canvas gl={{ preserveDrawingBuffer: true }} flat>
      

    <Sky sunPosition={[ 2.3, 0.6, -3.6 ]} turbidity={0.1} mieCoefficient={0.01} />
        <Stars />
        {/* <Cloud
                position={[5, 0, 0]}
                opacity={0.4}
                speed={0.05} // Rotation speed
                width={20} // Width of the full cloud
                depth={1.5} // Z-dir depth
                segments={10} // Number of particles
        /> */}
    

        {/* Light */}
    <ambientLight intensity={1} />

      <Tower />
      <Dunk />
      <Robot />

      <ScrollControls pages={5}>
        <SheetProvider sheet={sheet}>
          <Scene />
        </SheetProvider>
      </ScrollControls>
    </Canvas>
    
    </>
  )
}

