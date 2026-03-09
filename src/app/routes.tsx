import { createBrowserRouter, Navigate } from "react-router";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import RoleChoicePage from "./pages/RoleChoicePage";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import BrowseJobsPage from "./pages/dashboard/BrowseJobsPage";
import ApplicationsPage from "./pages/dashboard/ApplicationsPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import EmployeeProfilePage from "./pages/EmployeeProfilePage";
import EnterpriseOnboarding from "./pages/enterprise/EnterpriseOnboarding";
import EnterpriseDashboard from "./pages/enterprise/EnterpriseDashboard";
import EnterprisePublicProfile from "./pages/enterprise/EnterprisePublicProfile";
import ManageJobs from "./pages/enterprise/ManageJobs";
import ApplicantsPage from "./pages/enterprise/ApplicantsPage";
import ClientOnboarding from "./pages/client/ClientOnboarding";
import EmployeeSelfie from "./pages/EmployeeSelfie";
import ClientDashboardLayout from "./components/layout/ClientDashboardLayout";
import OverviewPage from "./pages/client/OverviewPage";
import BrowsePage from "./pages/client/BrowsePage";
import ClientMessagesPage from "./pages/client/MessagesPage";
import ClientProfilePage from "./pages/client/ProfilePage";
import WhyUsPage from "./pages/WhyUsPage";
import SponsorsPage from "./pages/SponsorsPage";
import ContactPage from "./pages/ContactPage";

export const router = createBrowserRouter([
  { path: "/", Component: LandingPage },
  { path: "/auth", Component: AuthPage },
  { path: "/role-choice", Component: RoleChoicePage },
  { path: "/why-us", Component: WhyUsPage },
  { path: "/sponsors", Component: SponsorsPage },
  { path: "/contact", Component: ContactPage },
  { path: "/employee/:id", Component: EmployeeProfilePage },
  { path: "/enterprise/onboarding", Component: EnterpriseOnboarding },
  { path: "/enterprise/dashboard", Component: EnterpriseDashboard },
  { path: "/enterprise/profile", Component: EnterprisePublicProfile },
  { path: "/enterprise/jobs", Component: ManageJobs },
  { path: "/enterprise/jobs/:jobId/applicants", Component: ApplicantsPage },
  { path: "/client/onboarding", Component: ClientOnboarding },
  { path: "/employee/selfie", Component: EmployeeSelfie },
  { path: "/client/dashboard", element: <Navigate to="/client/browse" replace /> },
  {
    path: "/client",
    Component: ClientDashboardLayout,
    children: [
      { index: true, element: <Navigate to="/client/browse" replace /> },
      { path: "overview", Component: OverviewPage },
      { path: "browse", Component: BrowsePage },
      { path: "messages", Component: ClientMessagesPage },
      { path: "profile", Component: ClientProfilePage },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardHome },
      { path: "jobs", Component: BrowseJobsPage },
      { path: "applications", Component: ApplicationsPage },
      { path: "profile", Component: ProfilePage },
    ],
  },
]);
