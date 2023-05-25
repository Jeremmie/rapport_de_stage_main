import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import App from './App.jsx'
import { Loader } from "@react-three/drei";


/* Tuto theatre part */
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import React, { StrictMode, Suspense } from "react";
import { ScrollControls, useScroll, Loader } from "@react-three/drei";
import { getProject, val } from "@theatre/core";
import {
  SheetProvider,
  useCurrentSheet,
} from "@theatre/r3f";

studio.extend(extension);
studio.initialize();
studio.ui.hide()


const root = ReactDOM.createRoot(document.querySelector('#root'))



root.render(
    <>
    
    
      <Loader />
      <App>
      <Canvas>
      <Suspense fallback={null}>
      <Experience />
      </Suspense>
      </Canvas>
      </App>
      {/* <Loader /> */}
    

    </>

    
)

