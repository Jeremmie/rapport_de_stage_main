import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll } from "@react-three/drei";
import Experience from "/Experience.jsx"
import Camera from "./components/camera.jsx";
import flyThroughState from "./fly2-state.json"
import { useControls } from 'leva'
import { getProject, val } from "@theatre/core";
import {
  SheetProvider,
  useCurrentSheet,
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
    <Canvas gl={{ preserveDrawingBuffer: true }} flat>
      <Experience></Experience>
      <ScrollControls pages={5}>
        <SheetProvider sheet={sheet}>
          <Scene />
          { PerspectiveCamera && <Camera /> }
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

}