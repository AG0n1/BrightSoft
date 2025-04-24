import s from '../../mainPageView/styles.module.scss';
import {StarFilled} from '@ant-design/icons';
import {useUserStore} from '../../../store/userStore';
import {FC} from 'react';

const Navigation: FC = (): JSX.Element => {
  const { role, stars } = useUserStore();
  return (
    <nav className={s.nav}>
      {role === 'user' && (
        <div className={s.stars}>
          <StarFilled className={s.starIcon} />
          <h3>{stars}</h3>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
