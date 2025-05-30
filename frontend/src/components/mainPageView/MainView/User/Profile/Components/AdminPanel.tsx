import s from '../styles.module.scss';
import { Button, Modal } from 'antd';
import { Outlet } from 'react-router-dom';
import React, { FC } from 'react';

interface IAdminPanel {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminPanel: FC<IAdminPanel> = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <div className={s.rightContainer}>
      <section className={s.adminBlock}>
        <h2>Администрирование</h2>
        <Button
          type="primary"
          danger
          className={s.adminButton}
        >
          Все заявки
        </Button>
        <Button
          type="primary"
          className={s.adminButtonUnlock}
        >
          Закрытые заявки
        </Button>
      </section>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
      >
        <Outlet />
      </Modal>
    </div>
  );
};
