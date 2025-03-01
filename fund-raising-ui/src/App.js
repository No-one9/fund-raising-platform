import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./pages/layout/Layout";
import Homepage from "./pages/home/HomePage";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import NotFound from "./pages/login/NotFound";
import AccessDenied from "./pages/login/AccessDenied";
import UserCampaignList from "./pages/user/UserCampaignsList";
import CreateCampaign from "./pages/user/CreateCampaign";
import EditCampaign from "./pages/user/EditCampaign";
import CampaignsList from "./pages/campaigns/CampaignsList";
import CampaignDetails from "./pages/user/CampaignDetails";
import Logout from "./pages/login/Logout";
import AdminLogin from "./pages/admin/AdminLogin";
import DonorLogin from "./pages/donor/DonorLogin";
import AdminUsersList from "./pages/admin/AdminUsersList";
import AdminDonorList from "./pages/admin/AdminDonorList";
import AdminCampaignList from "./pages/admin/AdminCampaignsList";
import DonorRegister from "./pages/donor/DonorRegistration";
import DonorDonationsList from "./pages/donor/DonorDonationsList";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/user/login" element={<Login />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/home" element={<Homepage />} />

            <Route exact path="/access-denied" element={<AccessDenied />} />
            <Route path="*" element={<NotFound />} />

            <Route exact path="/" element={<Homepage />} />

            <Route exact path="/campaigns" element={<CampaignsList />} />
            <Route
              exact
              path="/campaigns/:campaignId"
              element={<CampaignDetails />}
            />

            {/* user urls */}
            <Route
              exact
              path="/user/campaigns"
              element={<UserCampaignList />}
            />
            <Route
              exact
              path="/user/campaigns/create"
              element={<CreateCampaign />}
            />
            <Route
              exact
              path="/user/campaigns/:campaignId/edit"
              element={<EditCampaign />}
            />
            <Route
              exact
              path="/user/campaigns/:campaignId/edit"
              element={<UserCampaignList />}
            />

            {/* donor urls */}
            <Route exact path="/donor/login" element={<DonorLogin />} />
            <Route exact path="/donor/register" element={<DonorRegister />} />
            <Route
              exact
              path="/donor/donations"
              element={<DonorDonationsList />}
            />

            {/* admin urls */}
            <Route exact path="/admin/login" element={<AdminLogin />} />
            <Route exact path="/admin/users" element={<AdminUsersList />} />
            <Route
              exact
              path="/admin/users/:userId/campaigns"
              element={<AdminCampaignList />}
            />
            <Route exact path="/admin/donors" element={<AdminDonorList />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
