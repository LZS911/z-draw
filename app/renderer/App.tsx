import Home from './pages/Home';
import LayoutComponent from './pages/Layout';

import './App.css';
import { GlobalSnackbars } from './components';

export default function App() {
  return (
    <>
      <LayoutComponent>
        <Home />
      </LayoutComponent>
      <GlobalSnackbars />
    </>
  );
}
