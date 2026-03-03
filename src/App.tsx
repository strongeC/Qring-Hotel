/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { queryClient } from './lib/queryClient';
import GuestLayout from './layouts/GuestLayout';
import BarLayout from './layouts/BarLayout';
import GuestLanding from './pages/guest/GuestLanding';
import BeachMenu from './pages/guest/BeachMenu';
import RoomRequests from './pages/guest/RoomRequests';
import OrderStatus from './pages/guest/OrderStatus';
import RequestStatus from './pages/guest/RequestStatus';
import Help from './pages/guest/Help';
import OrderHistory from './pages/guest/OrderHistory';
import BarLogin from './pages/bar/BarLogin';
import BarDashboard from './pages/bar/BarDashboard';
import BarOrders from './pages/bar/BarOrders';
import BarRequests from './pages/bar/BarRequests';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Guest Routes */}
          <Route path="/g" element={<GuestLayout />}>
            <Route index element={<GuestLanding />} />
            <Route path="beach" element={<BeachMenu />} />
            <Route path="room" element={<RoomRequests />} />
            <Route path="help" element={<Help />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="beach/order/:id" element={<OrderStatus />} />
            <Route path="room/request/:id" element={<RequestStatus />} />
          </Route>

          {/* Bar/Admin Routes */}
          <Route path="/b" element={<BarLayout />}>
            <Route path="login" element={<BarLogin />} />
            <Route path="dashboard" element={<BarDashboard />} />
            <Route path="orders" element={<BarOrders />} />
            <Route path="requests" element={<BarRequests />} />
            <Route index element={<Navigate to="/b/login" replace />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/g" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
