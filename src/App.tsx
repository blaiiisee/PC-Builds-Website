import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./components/SiteLayout";
import { AboutPage } from "./pages/AboutPage";
import { BuildDetailPage } from "./pages/BuildDetailPage";
import { BuildListingPage } from "./pages/BuildListingPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="builds"
            element={
              <BuildListingPage
                eyebrow="Complete collection"
                title="Browse All Builds"
                description="Every current recommendation, organized around useful budgets and real workloads."
              />
            }
          />
          <Route
            path="gaming"
            element={
              <BuildListingPage
                category="gaming"
                eyebrow="Gaming recommendations"
                title="Gaming PC Builds"
                description="Performance-focused configurations for esports, 1080p, 1440p, and modern AAA games."
              />
            }
          />
          <Route
            path="productivity"
            element={
              <BuildListingPage
                category="productivity"
                eyebrow="Creator recommendations"
                title="Productivity Builds"
                description="Balanced systems for editing, creative applications, and demanding everyday work."
              />
            }
          />
          <Route path="builds/:slug" element={<BuildDetailPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
