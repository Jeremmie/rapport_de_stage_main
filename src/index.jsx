import './style.css'
import ReactDOM from 'react-dom/client'


import App from './App.jsx'
import { Loader } from "@react-three/drei";


/* Tuto theatre part */
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import React, { Suspense } from "react";


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

