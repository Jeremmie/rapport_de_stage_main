import { Canvas, useFrame } from "@react-three/fiber";
import { Gltf, Sky, ScrollControls, useScroll } from "@react-three/drei";
import Experience from "/Experience.jsx"
import flyThroughState from "./fly1-state.json"

import { getProject, val } from "@theatre/core";
import {
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
} from "@theatre/r3f";


export default function App() {
    const sheet = getProject("Fly Through", {state: flyThroughState}).sheet("Scene");

  return (
    <Canvas gl={{ preserveDrawingBuffer: true }} flat>
      
      <ScrollControls pages={5}>
        <SheetProvider sheet={sheet}>
          <Scene />
        </SheetProvider>
      </ScrollControls>
    </Canvas>
  );
}

function Scene() {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  // our callback will run on every animation frame
  useFrame(() => {
    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  const bgColor = "#D489F3";

  return (
    <>
      <Experience></Experience>
      {/* <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={60}
        near={0.1}
        far={70}
      /> */}
    </>
  );
}