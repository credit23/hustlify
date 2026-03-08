import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import RoleChoicePage from "./pages/RoleChoicePage";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import MessagesPage from "./pages/dashboard/MessagesPage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import HustlifyAIPage from "./pages/dashboard/HustlifyAIPage";
import EmployeeProfilePage from "./pages/EmployeeProfilePage";
import EnterpriseOnboarding from "./pages/enterprise/EnterpriseOnboarding";
import EnterpriseDashboard from "./pages/enterprise/EnterpriseDashboard";
import EnterprisePublicProfile from "./pages/enterprise/EnterprisePublicProfile";
import ManageJobs from "./pages/enterprise/ManageJobs";
import ApplicantsPage from "./pages/enterprise/ApplicantsPage";
import ClientOnboarding from "./pages/client/ClientOnboarding";
import ClientDashboard from "./pages/client/ClientDashboard";
import PostJobPage from "./pages/client/PostJobPage";
import ManageHires from "./pages/client/ManageHires";
import PaymentsPage from "./pages/client/PaymentsPage";
import ClientDashboardLayout from "./components/layout/ClientDashboardLayout";
import OverviewPage from "./pages/client/OverviewPage";
import BrowsePage from "./pages/client/BrowsePage";
import ClientMessagesPage from "./pages/client/MessagesPage";
import AIPage from "./pages/client/AIPage";
import ClientProfilePage from "./pages/client/ProfilePage";
import ClientNotificationsPage from "./pages/client/NotificationsPage";
import ClientSettingsPage from "./pages/client/SettingsPage";
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
  { path: "/client/dashboard", Component: ClientDashboard },
  { path: "/client/messages", Component: ClientMessagesPage },
  {
    path: "/client",
    Component: ClientDashboardLayout,
    children: [
      { path: "overview", Component: OverviewPage },
      { path: "browse", Component: BrowsePage },
      { path: "jobs", Component: ManageHires },
      { path: "post-job", Component: PostJobPage },
      { path: "payments", Component: PaymentsPage },
      { path: "payment", Component: PaymentsPage },
      { path: "ai", Component: AIPage },
      { path: "profile", Component: ClientProfilePage },
      { path: "notifications", Component: ClientNotificationsPage },
      { path: "settings", Component: ClientSettingsPage },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardHome },
      { path: "messages", Component: MessagesPage },
      { path: "notifications", Component: NotificationsPage },
      { path: "settings", Component: SettingsPage },
      { path: "profile", Component: ProfilePage },
      { path: "hustlify-ai", Component: HustlifyAIPage },
    ],
  },
]);