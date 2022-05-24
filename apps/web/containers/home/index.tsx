import FooterComponent from '../../components/footer';
import HeaderComponent from '../../components/header';
import { FC } from 'react';
import styles from './index.module.scss';

const HomeContainer: FC<any> = () => {
  return (
    <div className={styles.page}>
      <HeaderComponent />
      <div className="container">
        <div className={styles.content}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            eget aliquet ipsum, eget commodo urna. Nullam sit amet ornare arcu,
            in fermentum eros. Sed suscipit dolor id magna rhoncus commodo. In
            facilisis nibh ac libero cursus euismod. Aliquam erat volutpat.
            Phasellus facilisis justo risus, egestas fringilla sem condimentum
            a. Vestibulum blandit, erat sed finibus sodales, odio quam imperdiet
            lacus, quis blandit turpis ipsum non augue. Curabitur fermentum mi
            non lectus mattis tincidunt. Nulla urna lorem, facilisis et
            tristique nec, mollis eu enim. Aliquam nibh sem, tempus eget dictum
            nec, pretium sed orci. Vestibulum rutrum aliquet leo, ut volutpat
            tortor congue a. Nam maximus sapien ac risus placerat congue. Sed
            erat tellus, eleifend sed tristique in, bibendum vel libero. Donec
            vitae nibh a lectus egestas venenatis nec id purus.
          </p>
          <p>
            Donec viverra mauris nunc, eget pulvinar est laoreet dignissim.
            Quisque pharetra turpis quis fermentum lobortis. Maecenas vehicula
            odio mauris, et tincidunt elit luctus id. Phasellus at lorem eu
            ipsum pharetra sodales. Quisque placerat diam eu ullamcorper
            fermentum. Morbi vel nulla non nunc aliquet pellentesque. Duis
            ultricies magna id nisi cursus iaculis. Nunc ut finibus sem, vitae
            tristique lectus. Morbi accumsan, dolor in posuere scelerisque,
            ipsum elit faucibus nisi, vel semper arcu purus nec ligula. Nulla
            ultricies justo eu felis mattis, at iaculis nisl scelerisque. Nunc
            dapibus lacinia odio id semper.
          </p>
          <p>
            Phasellus aliquet sem id ullamcorper viverra. In convallis ligula
            non semper semper. Vivamus cursus, massa in viverra iaculis, ipsum
            mauris auctor sem, at dapibus erat enim ut felis. Morbi maximus,
            lorem ut sagittis tristique, elit massa vulputate nisi, id convallis
            ligula lectus at elit. Donec nec rhoncus ex, vitae tincidunt ante.
            Pellentesque efficitur eros non est faucibus, a rutrum elit laoreet.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Morbi mollis nisi nec nisl pretium vulputate.
            Aenean ut diam quis velit commodo pharetra in ac lectus. Suspendisse
            magna nisl, pellentesque a lectus ac, dictum pellentesque purus. Sed
            et tempor nisl. Nam vestibulum convallis tortor, quis laoreet lectus
            porta sed. Donec viverra ex nunc. Aliquam faucibus lectus vel
            aliquet pretium.
          </p>
          <p>
            Curabitur fermentum fringilla augue. Morbi vitae libero quis ligula
            tempor lacinia sit amet placerat dolor. Maecenas facilisis tincidunt
            elit. Aliquam vel scelerisque felis, eu vulputate lectus.
            Suspendisse dolor tellus, vulputate eu consectetur sit amet,
            interdum in erat. Cras ex ante, volutpat nec sagittis quis, viverra
            quis nisl. Phasellus porttitor ex quis metus luctus, vel facilisis
            erat ornare. Vestibulum porttitor, elit ut convallis venenatis, eros
            augue tincidunt mi, id imperdiet velit tellus porta mauris.
          </p>
          <p>
            Aenean dapibus urna dui. Proin ullamcorper accumsan consectetur.
            Morbi sed diam bibendum, hendrerit dui a, ultrices orci. Ut
            malesuada nulla tempus est tristique, id finibus diam congue. Nullam
            vehicula tempus convallis. Nam sed diam eu metus pellentesque
            aliquam. Donec sagittis hendrerit tincidunt. Aenean porta efficitur
            ante, ut ornare tortor dapibus ut. Donec justo mauris, suscipit sed
            tincidunt fringilla, fermentum quis ante.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            eget aliquet ipsum, eget commodo urna. Nullam sit amet ornare arcu,
            in fermentum eros. Sed suscipit dolor id magna rhoncus commodo. In
            facilisis nibh ac libero cursus euismod. Aliquam erat volutpat.
            Phasellus facilisis justo risus, egestas fringilla sem condimentum
            a. Vestibulum blandit, erat sed finibus sodales, odio quam imperdiet
            lacus, quis blandit turpis ipsum non augue. Curabitur fermentum mi
            non lectus mattis tincidunt. Nulla urna lorem, facilisis et
            tristique nec, mollis eu enim. Aliquam nibh sem, tempus eget dictum
            nec, pretium sed orci. Vestibulum rutrum aliquet leo, ut volutpat
            tortor congue a. Nam maximus sapien ac risus placerat congue. Sed
            erat tellus, eleifend sed tristique in, bibendum vel libero. Donec
            vitae nibh a lectus egestas venenatis nec id purus.
          </p>
          <p>
            Donec viverra mauris nunc, eget pulvinar est laoreet dignissim.
            Quisque pharetra turpis quis fermentum lobortis. Maecenas vehicula
            odio mauris, et tincidunt elit luctus id. Phasellus at lorem eu
            ipsum pharetra sodales. Quisque placerat diam eu ullamcorper
            fermentum. Morbi vel nulla non nunc aliquet pellentesque. Duis
            ultricies magna id nisi cursus iaculis. Nunc ut finibus sem, vitae
            tristique lectus. Morbi accumsan, dolor in posuere scelerisque,
            ipsum elit faucibus nisi, vel semper arcu purus nec ligula. Nulla
            ultricies justo eu felis mattis, at iaculis nisl scelerisque. Nunc
            dapibus lacinia odio id semper.
          </p>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default HomeContainer;
