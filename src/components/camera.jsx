import { PerspectiveCamera } from "@theatre/r3f";
import flyThroughState from "../fly1-state.json"
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll, Stars } from "@react-three/drei";
import { getProject, val } from "@theatre/core";
import {
  SheetProvider,
  useCurrentSheet,
} from "@theatre/r3f";

export default function Camera(){
  
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

  const sheet = getProject("Fly Through", {state: flyThroughState}).sheet("Scene");

    return <>
    <ScrollControls pages={5}>
        <SheetProvider sheet={sheet}>
          <Scene />
          
          <PerspectiveCamera
            theatreKey="Camera"
            makeDefault
            fov={60}
            near={0.1}
          />
        </SheetProvider>
      </ScrollControls>
    </>
}

