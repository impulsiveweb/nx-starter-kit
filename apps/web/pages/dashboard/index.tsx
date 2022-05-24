import AuthProvider from '../../context/auth';
import LayoutComponent from '../../components/layout';

export function Dashboard() {
  return (
    <AuthProvider>
       <LayoutComponent title="NX Starter Kit">
        This is dashboard
      </LayoutComponent>
    </AuthProvider>
  );
}

export default Dashboard;
