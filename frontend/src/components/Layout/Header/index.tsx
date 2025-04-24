import {Menu} from 'antd';
import {HEADER_OPTIONS} from '@common/MenuConfigs/config';
import {Header} from 'antd/lib/layout/layout';
import {useLocation, useNavigate} from 'react-router-dom';
import {routeGenerator} from '@common/utils/generatotrs';

import {Routes} from '@common/constants/routes';

const LayoutHeader = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Header style={{ display: 'flex', alignItems: 'center', background: 'white' }}>
      <Menu
        theme="light"
        mode="horizontal"
        items={HEADER_OPTIONS}
        style={{ flex: 1, minWidth: 0 }}
        defaultSelectedKeys={[pathname.split('/')[2]]}
        onClick={(value) => {
          navigate({
            pathname: routeGenerator(
              Routes.mainPage,
              `/${value.key}`,
            ),
          });
        }}
      />
      {/*<Navigation />*/}
    </Header>
  );
};

export default LayoutHeader;
