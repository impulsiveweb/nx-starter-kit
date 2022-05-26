import AuthProvider from '../../context/auth';
import LayoutComponent from '../../components/layout';
import LoginContainer from '../../containers/login';

export function Login() {
  return (
    <AuthProvider>
      <LayoutComponent title="Login" noLayout="true">
        <LoginContainer />
      </LayoutComponent>
    </AuthProvider>
  );
}

export default Login;
