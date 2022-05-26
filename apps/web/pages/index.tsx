import LayoutComponent from '../components/layout';
import HomeContainer from '../containers/home';
import AuthProvider from '../context/auth';
export function Index() {
  return (
    <AuthProvider anonymous={true}>
      <LayoutComponent title="NX Starter Kit">
        <HomeContainer />
      </LayoutComponent>
    </AuthProvider>
  );
}

export default Index;
