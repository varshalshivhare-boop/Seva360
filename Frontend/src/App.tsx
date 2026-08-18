import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { AuthPortalPage } from './pages/auth/AuthPortalPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { DevoteeDashboardPage } from './pages/devotee/DevoteeDashboardPage';
import { BookDarshanPage } from './pages/devotee/BookDarshanPage';
import { VirtualQueuePage } from './pages/devotee/VirtualQueuePage';
import { TemplesDirectoryPage } from './pages/devotee/TemplesDirectoryPage';
import { CommandCenterPage } from './pages/authority/CommandCenterPage';
import { EmergencyHelpPage } from './pages/emergency/EmergencyHelpPage';
import { DevoteeLayout } from './layouts/DevoteeLayout';
import { AuthorityLayout } from './layouts/AuthorityLayout';
import { ROUTES } from './config/routes';

import './styles/index.css';
import './styles/heritage-modernist.css';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Preserved Cinematic Scroll Landing Experience */}
          <Route path={ROUTES.LANDING} element={<LandingPage />} />

          {/* Authentication & Portal Entry */}
          <Route path={ROUTES.APP_ENTRY} element={<AuthPortalPage />} />
          <Route path={ROUTES.LOGIN} element={<AuthPortalPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />

          {/* Devotee Experience Routes */}
          <Route
            path={ROUTES.DEVOTEE.ROOT}
            element={<Navigate to={ROUTES.DEVOTEE.DASHBOARD} replace />}
          />
          <Route
            path={ROUTES.DEVOTEE.DASHBOARD}
            element={
              <DevoteeLayout>
                <DevoteeDashboardPage />
              </DevoteeLayout>
            }
          />
          <Route
            path={ROUTES.DEVOTEE.BOOK_DARSHAN}
            element={
              <DevoteeLayout>
                <BookDarshanPage />
              </DevoteeLayout>
            }
          />
          <Route
            path={ROUTES.DEVOTEE.VIRTUAL_QUEUE}
            element={
              <DevoteeLayout>
                <VirtualQueuePage />
              </DevoteeLayout>
            }
          />
          <Route
            path={ROUTES.DEVOTEE.TEMPLES}
            element={
              <DevoteeLayout>
                <TemplesDirectoryPage />
              </DevoteeLayout>
            }
          />

          {/* Emergency SOS Route */}
          <Route
            path={ROUTES.EMERGENCY}
            element={
              <DevoteeLayout>
                <EmergencyHelpPage />
              </DevoteeLayout>
            }
          />

          {/* Authority & Command Center Routes */}
          <Route
            path={ROUTES.AUTHORITY.ROOT}
            element={<Navigate to={ROUTES.AUTHORITY.DASHBOARD} replace />}
          />
          <Route
            path={ROUTES.AUTHORITY.DASHBOARD}
            element={
              <AuthorityLayout>
                <CommandCenterPage />
              </AuthorityLayout>
            }
          />
          <Route
            path={ROUTES.AUTHORITY.ALERTS}
            element={
              <AuthorityLayout>
                <CommandCenterPage />
              </AuthorityLayout>
            }
          />
          <Route
            path={ROUTES.AUTHORITY.ZONES}
            element={
              <AuthorityLayout>
                <CommandCenterPage />
              </AuthorityLayout>
            }
          />

          {/* Catch-all fallback to Landing */}
          <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
