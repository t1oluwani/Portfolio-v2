import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SiteShell } from "@/components/layout/SiteShell";
import { HomePage } from "@/pages/HomePage";
import { ProjectPage } from "@/pages/ProjectPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
