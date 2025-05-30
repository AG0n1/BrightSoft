import s from './styles.module.scss';
import { Button, Flex, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { IUserData, IUserInfo } from '../../../../../types/commonTypes';
import FormItem from 'antd/es/form/FormItem';
import { useUserStore } from '../../../../../store/userStore';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@common/constants/routes';
import { routeGenerator } from '@common/utils/generatotrs';
import { useForm } from 'antd/es/form/Form';
import { logout } from '../../../../Authorization/Login/actions';
import { getUserInfoPublic, updateUserProfile } from './actions';
import { UserProfileSection } from './Components/UserProfileSection';
import { AdminPanel } from './Components/AdminPanel';
import { TeacherPanel } from './Components/TeacherPanel';

const Profile = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const { user, logoutUser, role } = useUserStore();
  const [userInfo, setUserInfo] = useState<IUserData | undefined>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userInfoPublic, setUserInfoPublic] = useState<IUserInfo | undefined>();
  useEffect(() => {
    if (!user) return;
    if (!userInfoPublic) {
      getUserInfoPublic(user).then((data) => {
        if (!data) return;
        setUserInfoPublic(data);
      });
    }
  }, [user, form]);

  const handleRequestsClick = () => {
    navigate(routeGenerator(Routes.mainPage, Routes.applications));
  };

  const updateUser = async (val: Partial<IUserData> & { password?: string }) => {
    if (!user) return;
    try {
      const data = await updateUserProfile({
        id: user,
        firstName: val.firstName,
        secondName: val.secondName,
        fatherName: val.fatherName,
        userName: val.userName,
        email: val.email,
        password: val.password,
      });
      setUserInfo(data);
      setUserInfoPublic((prev) => (prev ? { ...prev, ...val } : prev));
      form.setFieldsValue(val);
      setDisabled(true);
      message.success('Профиль успешно обновлен');
    } catch (e) {
      console.error('Ошибка обновления профиля:', e);
    }
  };

  const handleLogout = () => logout(logoutUser);

  const handleImageUpload = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <main className={s.profileContainer}>
      <Flex gap={20}>
        <UserProfileSection
          handleImageUpload={handleImageUpload}
          profileImage={profileImage}
          handleLogout={handleLogout}
          userInfo={userInfo}
        />

        <div className={s.right}>
          <section
            className={`${s.infoBlock} ${role !== 'administrator' ? s.infoBlockFull : ''}`}
          >
            <h2>Личная информация</h2>
            <Form
              form={form}
              className={s.form}
              disabled={disabled}
              onFinish={updateUser}
              initialValues={userInfo}
            >
              <FormItem
                label="Фамилия"
                name="secondName"
              >
                {disabled ? (
                  <span>{form.getFieldValue('secondName') || 'Не указано'}</span>
                ) : (
                  <Input placeholder={userInfo?.secondName || 'Введите фамилию'} />
                )}
              </FormItem>
              <FormItem
                label="Имя"
                name="firstName"
              >
                {disabled ? (
                  <span>{form.getFieldValue('firstName') || 'Не указано'}</span>
                ) : (
                  <Input placeholder={userInfo?.firstName || 'Введите имя'} />
                )}
              </FormItem>
              <FormItem
                label="Отчество"
                name="fatherName"
              >
                {disabled ? (
                  <span>{form.getFieldValue('fatherName') || 'Не указано'}</span>
                ) : (
                  <Input placeholder={userInfo?.fatherName || 'Введите отчество'} />
                )}
              </FormItem>
              <FormItem
                label="Имя пользователя"
                name="userName"
              >
                {disabled ? (
                  <span>{form.getFieldValue('userName') || 'Не указано'}</span>
                ) : (
                  <Input placeholder={userInfo?.userName || 'Введите имя пользователя'} />
                )}
              </FormItem>
              <FormItem
                label="Email"
                name="email"
              >
                {disabled ? (
                  <span>{form.getFieldValue('email') || 'Не указано'}</span>
                ) : (
                  <Input placeholder={userInfo?.email || 'Введите email'} />
                )}
              </FormItem>
              <FormItem
                label="Пароль"
                name="password"
              >
                {disabled ? (
                  <span>******</span>
                ) : (
                  <Input.Password placeholder="Введите новый пароль" />
                )}
              </FormItem>
              {!disabled && (
                <div className={s.formButtons}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={s.saveButton}
                  >
                    Сохранить
                  </Button>
                  <Button
                    onClick={() => setDisabled(true)}
                    className={s.cancelButton}
                  >
                    Отменить
                  </Button>
                </div>
              )}
            </Form>
            {disabled && (
              <div className={s.formButtons}>
                <Button
                  type="primary"
                  onClick={() => setDisabled(false)}
                  className={s.editButton}
                >
                  Редактировать
                </Button>
                <Button
                  type="primary"
                  onClick={handleRequestsClick}
                  className={s.logoutButton}
                >
                  Мои заявки
                </Button>
              </div>
            )}
          </section>

          {role === 'administrator' && (
            <AdminPanel
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </div>
      </Flex>
      {role === 'teacher' && <TeacherPanel />}
    </main>
  );
};

export default Profile;
