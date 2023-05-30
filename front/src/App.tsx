import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {AuthorizationPage} from "./pages/authentication";
import {RegistrationPage} from "./pages/register";
import {MainMenuPage} from "./pages/mainmenu";
import {CatalogPage} from "./pages/catalog";
import {KugooHXplusPage} from "./pages/kugooHXplus";

function App() {
  return (
      <Routes>
          <Route path="/" element={<AuthorizationPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/main" element={<MainMenuPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/kugoohxplus" element={<KugooHXplusPage />} />
      </Routes>
  );
}

export default App;
