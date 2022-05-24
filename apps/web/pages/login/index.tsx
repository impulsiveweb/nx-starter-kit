import AuthProvider from '../../context/auth';
import LayoutComponent from '../../components/layout';

export function Login() {
  return (
    <AuthProvider>
       <LayoutComponent title="Login" noLayout="true" >
        This is dashboard
      </LayoutComponent>
    </AuthProvider>
  );
}

export default Login;
