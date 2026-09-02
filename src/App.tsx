import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./components/SiteLayout";
import { AboutPage } from "./pages/AboutPage";
import { BrowsePage } from "./pages/BrowsePage";
import { SocialsPage } from "./pages/SocialsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<BrowsePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="socials" element={<SocialsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
