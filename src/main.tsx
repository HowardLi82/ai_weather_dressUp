import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <head>
      <title>AI Weather DressUp!</title>
    </head>
    <App/>
  </StrictMode>
)
