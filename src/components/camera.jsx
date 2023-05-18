import { PerspectiveCamera } from "@theatre/r3f";

export default function Camera(){
  
    return <>
    <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={60}
        near={0.1}
        far={70}
      />
    </>
}

