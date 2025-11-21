import React from 'react'
import ReactDOM from 'react-dom/client'
import { PcrTrainerApp } from './features/pcr-trainer/components/PcrTrainerApp'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PcrTrainerApp />
  </React.StrictMode>,
)
