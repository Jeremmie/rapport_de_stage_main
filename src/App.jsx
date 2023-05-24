import { Canvas, useFrame } from "@react-three/fiber";
import React from "react";
import { useMediaQuery } from 'react-responsive'
import { ScrollControls, useScroll } from "@react-three/drei";
import Experience from "/Experience.jsx"
import flyThroughState from "./fly.json"
import { useControls } from 'leva'
import { getProject, val } from "@theatre/core";
import {
  SheetProvider,
  useCurrentSheet,
  PerspectiveCamera
} from "@theatre/r3f";


export default function App() {
    /**
     * Debug pannel
     */
    const {PerspectiveCamera} = useControls('Camera',{
      PerspectiveCamera: true
  })

  const sheet = getProject("Fly Through", {state: flyThroughState}).sheet("Scene");

  return (
    <>
    <Canvas gl={{ preserveDrawingBuffer: true }} flat>
      <Experience></Experience>
      <ScrollControls pages={5}>
        <SheetProvider sheet={sheet}>
          <Scene />
        </SheetProvider>
      </ScrollControls>
    </Canvas>
    </>
  )
}

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