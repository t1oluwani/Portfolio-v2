import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SiteShell } from "@/components/layout/SiteShell";
import { HomePage } from "@/pages/HomePage";
import { ProjectPage } from "@/pages/ProjectPage";
import { TrackingCursor } from "@/components/interface/TrackingCursor";

export function App() {
  return (
    <BrowserRouter>
      <TrackingCursor />
      <Routes>
        <Route element={<SiteShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
