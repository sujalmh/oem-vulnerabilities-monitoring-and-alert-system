import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNav from "./components/Nav/TopNav/TopNav";
import Scraper from "./components/Scraper/Scraper";
import NotFound from "./components/Pages/NotFound";
import Home from "./Home";
import classes from "./App.module.css";
import ExportData from "./components/Export/ExportData";
import Tutorials from "./components/Tutorials/Tutorials";
import VideoPlayerPage from "./components/Tutorials/VideoPlayerPage";
import TutorialsPage from "./components/Tutorials/TutorialsPage";
import KnowledgeBasePage from "./components/Tutorials/KnowledgeBasePage";
import DiscussionForumPage from "./components/Feedback/DiscussionForumPage";
import FeedbackPage from "./components/Feedback/FeedbackPage";
import ReportVulnerabilityForm from "./components/Feedback/ReportVulnerabilityForm";
import ReportedVulnerabilitiesList from "./components/Feedback/ReportedVulnerabilitiesList";
import LandingPage from "./components/Home/Home";
import AsideNav from "./components/Nav/Sidebar/AsideNav";
import Register from "./components/Auth/Register";
import LogIn from "./components/Auth/Login";
import AddWebsite from "./components/Admin/AddWebsite";
import AdminPage from "./components/Admin/AdminPage";
import MoreDetails from "./components/Pages/MoreDetails";
import SettingPage from "./components/Setting/Settingpage.jsx"; 
import HelpPage from "./components/Help/HelpPage";// Import the SettingPage component

const App = () => {
  return (
    <div className="bg-gray-100">
      <TopNav />
      <AsideNav />
      <div className={classes["main-container"]}>
        <Routes>
          {/* Define Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/vulns/*" element={<Home />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />

          <Route path="/addsite" element={<AddWebsite />} />

          <Route path="/details" element={<MoreDetails />} />

          <Route path="/scraper" element={<Scraper />} />
          <Route path="/export" element={<ExportData />} />
          <Route path="/details/:id" element={<MoreDetails />} />

          <Route path="/tutorial">
            <Route path="/tutorial" element={<Tutorials />} />
            <Route path="/tutorial/:videoName" element={<VideoPlayerPage />} />
          </Route>

          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/knowledge-base" element={<KnowledgeBasePage />} />

         {/*  <Route path="/report" element={<ReportVulnerabilityForm />} />
          <Route path="/reported" element={<ReportedVulnerabilitiesList />} /> */}

          <Route path="/discussion" element={<DiscussionForumPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/help" element={<HelpPage />} />

          <Route path="/details" element={<MoreDetails />} />
          <Route path="/settings" element={<SettingPage />} />
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
