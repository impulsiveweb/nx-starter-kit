import LayoutComponent from '../components/layout';
import HomeContainer from '../containers/home';
export function Index() {
  return (
    <LayoutComponent title="NX Starter Kit" auth="true">
        <HomeContainer />
    </LayoutComponent>
  );
}

export default Index;
