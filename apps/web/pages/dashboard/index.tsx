import AuthProvider from '../../context/auth';
import LayoutComponent from '../../components/layout';
import DashboardContainer from '../..//containers/dashboard';

export function Dashboard() {
  return (
    <AuthProvider>
       <LayoutComponent title="Dashboard - NX Starter Kit">
          <DashboardContainer />
      </LayoutComponent>
    </AuthProvider>
  );
}

export default Dashboard;
