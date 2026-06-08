import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalonLogin from "@/pages/SalonLogin";
import SalonDashboard from "@/pages/SalonDashboard";
import Discover from "@/pages/Discover";
import QueueTracker from "@/pages/QueueTracker";
import AiInsights from "@/pages/AiInsights";
import { NotificationContainer } from "@/components/common/NotificationContainer";
import { ProtectedRoutes } from "./guards/ProtectedRoutes";
import { Suspense } from "react";
import { lazy } from "react";
import { LoadingState } from "./components/common/LoadingState";

function App() {
  const LazyDashboard = lazy(() => import("@/pages/SalonDashboard"));
  const LazyDiscover = lazy(() => import("@/pages/Discover"));
  const LazyQueueTracker = lazy(() => import("@/pages/QueueTracker"));
  const LazyAiInsights = lazy(() => import("@/pages/AiInsights"));

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingState message="Loading..." fullscreen />}>
        <Routes>
          <Route path="/" element={<LazyDiscover />} />
          <Route path="/login" element={<SalonLogin />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<LazyDashboard />} />
            <Route path="/discover" element={<LazyDiscover />} />
            <Route path="/queue/:id?" element={<LazyQueueTracker />} />
            <Route path="/ai-insights" element={<LazyAiInsights />} />
          </Route>
        </Routes>
      </Suspense>
      <NotificationContainer />
    </BrowserRouter>
  );
}

export default App;
