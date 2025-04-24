import {FC} from 'react';
import '../../../styles/login.scss';
import {Button, Image} from 'antd';
import logo from '../../../images/logo5 1.png';
import {authorizationFieldsGenerator, collectFieldsData,} from '@common/utils/generatotrs';
import {loginFieldsConfig} from './config';
import {login} from './actions';
import {ILoginDTO} from '../../../types/commonTypes';
import {messages} from '@common/constants/messages';
import {useUserStore} from '../../../store/userStore';

const Login: FC = () => {
  const { setUser } = useUserStore();
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: FormData = new FormData(event.target as HTMLFormElement);
    const userData: ILoginDTO = collectFieldsData(formData, ['email', 'password']);
    const { data } = await login(userData);

    if (data?.data?.access_token) {
      setUser(data.data.access_token);
    }
  };

  return (
    <div className={'login'}>
      <form
        onSubmit={(values) => handleLogin(values)}
        className={'loginForm'}
      >
        <div className={'loginFormInputs'}>
          <Image
            style={{background: 'white', padding: '20px'}}
            src={logo}
            width={700}
            preview={false}
          />
          <section>
            {authorizationFieldsGenerator(loginFieldsConfig)}
            <Button htmlType={'submit'}>{messages.button.login}</Button>
          </section>
        </div>
      </form>
      <footer className="footer">
        <a href="/createAccount">Нет аккаунта? Создать</a>
        <a href="#">Забыли пароль?</a>
      </footer>
    </div>
  );
};

export default Login;
