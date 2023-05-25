import './style.css'
import ReactDOM from 'react-dom/client'


import App from './App.jsx'
import { Loader } from "@react-three/drei";


/* Tuto theatre part */
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import React, { StrictMode, Suspense } from "react";

import { getProject, val } from "@theatre/core";
import {
  SheetProvider,
  useCurrentSheet,
} from "@theatre/r3f";
import { Canvas } from '@react-three/fiber';

studio.extend(extension);
studio.initialize();
studio.ui.hide()


const root = ReactDOM.createRoot(document.querySelector('#root'))


root.render(
    <>
    
      <Loader />
      <Suspense fallback={null}>
      <App />
      </Suspense>
    </>

    
)

