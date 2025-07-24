import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "qore-components/dist/style.css";
import './index.css'
import App from './App.tsx'
import { BookingProvider } from './BookingContext.tsx';
import GlobalModal from './GlobalModal.tsx';
import { ModalProvider } from 'qore-components';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BookingProvider>
    <ModalProvider>
      <GlobalModal />
      <App />
    </ModalProvider>
    </BookingProvider>
  </StrictMode>
);
