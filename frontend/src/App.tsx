import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalonLogin from "@/pages/SalonLogin";
import SalonDashboard from "@/pages/SalonDashboard";
import Discover from "@/pages/Discover";
import QueueTracker from "@/pages/QueueTracker";
import AiInsights from "@/pages/AiInsights";
import { NotificationContainer } from "@/components/common/NotificationContainer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/login" element={<SalonLogin />} />
        <Route path="/dashboard" element={<SalonDashboard />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/queue/:id?" element={<QueueTracker />} />
        <Route path="/ai-insights" element={<AiInsights />} />
      </Routes>
      <NotificationContainer />
    </BrowserRouter>
  );
}

export default App;

