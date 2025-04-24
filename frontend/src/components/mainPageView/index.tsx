import {ConfigProvider, Layout} from 'antd';
import {Outlet} from 'react-router-dom';
import PageWrapper from '../commonComponents/PageWrapper';
import LayoutHeader from '../Layout/Header';
import ErrorBoundary from '../commonComponents/ErrorBoundary';
import {useEffect, useState} from 'react';
import Loader from '../Layout/Loader';
import dayjs from 'dayjs';
import ruRU from 'antd/locale/ru_RU';
dayjs.locale('ru')

const MainPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, []);
  return (
      <ConfigProvider locale={ruRU}>
        <Layout style={{ minHeight: '100vh' }}>
          <Loader isLoading={loading}>
            <Layout>
              <LayoutHeader />
              <PageWrapper>
                <ErrorBoundary>
                  <Outlet />
                </ErrorBoundary>
              </PageWrapper>
            </Layout>
          </Loader>
        </Layout>
      </ConfigProvider>
  );
};

export default MainPage;
