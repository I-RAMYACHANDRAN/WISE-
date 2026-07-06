import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./admin/AdminLayout";
import FeedbackList from "./pages/FeedbackList";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Agenda from "./pages/Agenda";
import SessionDetails from "./pages/SessionDetails";
import MySchedule from "./pages/MySchedule";
import Speakers from "./pages/Speakers";
import SpeakerDetails from "./pages/SpeakerDetails";
import Venue from "./pages/Venue";
import Gallery from "./pages/Gallery";
import Announcements from "./pages/Announcements";
import Profile from "./pages/Profile";
import Organizer from "./pages/Organizer";
import Events from "./pages/Events";
import Feedback from "./pages/Feedback";
import AdminDashboard from "./admin/AdminDashboard";
import ManageSessions from "./admin/ManageSessions";
import ManageSpeakers from "./admin/ManageSpeakers";
import ManageAnnouncements from "./admin/ManageAnnouncements";
import ManageVenueMap from "./admin/ManageVenueMap";
import ManageGallery from "./admin/ManageGallery";
import ManageFeedback from "./admin/ManageFeedback";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageHelpSupport from "./admin/ManageHelpSupport";
import HelpSupport from "./pages/HelpSupport";
import ManageQueries from "./admin/ManageQueries";


function App() {

  return (

    <Routes>

  {/* Authentication */}

  <Route path="/" element={<Login />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* ===========================
      ATTENDEE ROUTES
  ============================ */}

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute role="attendee">
        <MainLayout
          title="Dashboard"
          subtitle="Women in Science & Engineering Conference 2026"
        >
          <Dashboard />
        </MainLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/agenda"
    element={
      <ProtectedRoute role="attendee">
        <MainLayout
          title="Agenda"
          subtitle="Explore the complete conference schedule"
        >
          <Agenda />
        </MainLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/agenda/:id"
    element={
      <ProtectedRoute role="attendee">
        <MainLayout
          title="Session Details"
          subtitle="View complete session information"
        >
          <SessionDetails />
        </MainLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/speaker/:id"
    element={
      <ProtectedRoute role="attendee">
        <MainLayout
          title="Speaker Details"
          subtitle="Know more about our speaker"
        >
          <SpeakerDetails />
        </MainLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/speakers"
    element={
      <ProtectedRoute role="attendee">
        <MainLayout
          title="Speakers"
          subtitle="Meet our distinguished conference speakers"
        >
          <Speakers />
        </MainLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/myschedule"
    element={
      <ProtectedRoute role="attendee">
        <MainLayout
          title="My Schedule"
          subtitle="View your registered conference sessions"
        >
          <MySchedule />
        </MainLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/profile"
    element={
      <ProtectedRoute role="attendee">
        <MainLayout
          title="My Profile"
          subtitle="Manage your attendee information"
        >
          <Profile />
        </MainLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/venue"
    element={
      <ProtectedRoute role="attendee">
        <MainLayout
          title="Venue"
          subtitle="Find your way around the conference venue"
        >
          <Venue />
        </MainLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/gallery"
    element={
      <ProtectedRoute role="attendee">
        <MainLayout
          title="Gallery"
          subtitle="Conference memories and highlights"
        >
          <Gallery />
        </MainLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/announcements"
    element={
      <ProtectedRoute role="attendee">
        <MainLayout
          title="Announcements"
          subtitle="Stay updated with the latest conference news"
        >
          <Announcements />
        </MainLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/feedback/:id"
    element={
      <ProtectedRoute role="attendee">
        <MainLayout
          title="Session Feedback"
          subtitle="Share your feedback"
        >
          <Feedback />
        </MainLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/organizer"
    element={
      <ProtectedRoute role="attendee">
        <MainLayout
          title="Organizer"
          subtitle="Conference organizing committee"
        >
          <Organizer />
        </MainLayout>
      </ProtectedRoute>
    }
  />

  {/* ===========================
      ORGANIZER ROUTES
  ============================ */}

  <Route
    path="/admin"
    element={
      <ProtectedRoute role="organizer">
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/sessions"
    element={
      <ProtectedRoute role="organizer">
        <AdminLayout>
          <ManageSessions />
        </AdminLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/speakers"
    element={
      <ProtectedRoute role="organizer">
        <AdminLayout>
          <ManageSpeakers />
        </AdminLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/announcements"
    element={
      <ProtectedRoute role="organizer">
        <AdminLayout>
          <ManageAnnouncements />
        </AdminLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/venue-map"
    element={
      <ProtectedRoute role="organizer">
        <AdminLayout>
          <ManageVenueMap />
        </AdminLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/gallery"
    element={
      <ProtectedRoute role="organizer">
        <AdminLayout>
          <ManageGallery />
        </AdminLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/feedback"
    element={
      <ProtectedRoute role="organizer">
        <AdminLayout>
          <ManageFeedback />
        </AdminLayout>
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin/help-support"
    element={
      <ProtectedRoute role="organizer">
        <AdminLayout>
          <ManageHelpSupport />
        </AdminLayout>
      </ProtectedRoute>
    }
  />
  <Route
  path="/help-support"
  element={
    <ProtectedRoute role="attendee">
      <MainLayout
        title="Help & Support"
        subtitle="Get assistance from the conference organizers"
      >
        <HelpSupport />
      </MainLayout>
    </ProtectedRoute>
  }
/>  

<Route
  path="/admin/queries"
  element={
    <ProtectedRoute role="organizer">
      <AdminLayout>
        <ManageQueries />
      </AdminLayout>
    </ProtectedRoute>
  }
/>


</Routes>
  );


}

export default App;