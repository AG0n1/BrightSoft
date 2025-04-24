import s from './styles.module.scss'
import {Button, Collapse, DatePicker, Form, Input, Modal, Select} from "antd";
import {useState} from "react";
import FormItem from "antd/es/form/FormItem";
import Dragger from "antd/es/upload/Dragger";
import {InboxOutlined} from "@ant-design/icons";
import {props} from "./config";
import {useForm} from "antd/es/form/Form";
import AxiosService from "../../../../../../axios/AxiosService";
import {useUserStore} from "../../../../../../store/userStore";
import {API_GET_USER_DEVICES} from "@common/constants/api";
import {devicesOptionsList} from "@common/constants/options";

const DevicesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [form] = useForm()
    const {user} = useUserStore()
    const getDevicesData = async () => {
        try {
            const {data} = await AxiosService.POST(API_GET_USER_DEVICES, {
                data: {
                    id: user
                }
            })
            console.log(data)
            return data
        } catch (e) {

        }
    }
    getDevicesData();

    const saveDevice = async (values) => {
        try {
            console.log(values)
        } catch (e) {}
    }

    return (
        <div className={s.modal}>
            {[].map((device) => (
                <Collapse accordion items={[{
                    key: '1',
                    label: device.type,
                    children: <p>{device.name}</p>,
                }]} />
            ))}
            <Button type={'primary'} onClick={() => setIsModalOpen(true)}>Добавить прибор</Button>
            <Modal
                className={s.nestedModal}
                footer={false}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                style={{ maxHeight: '90vh' }}
            >
                <Form form={form} className={s.form} onFinish={(values) => saveDevice(values)}>
                    <FormItem
                        layout={'vertical'}
                        name={'deviceType'}
                        label={'Тип устройства'}
                    >
                        <Select options={devicesOptionsList} />
                    </FormItem>
                    <FormItem
                        layout={'vertical'}
                        name={'name'}
                        label={'Название'}
                    >
                        <Input />
                    </FormItem>
                    <FormItem
                        layout={'vertical'}
                        name={'consumptionRate'}
                        label={'Потребление'}
                    >
                        <Input />
                    </FormItem>
                    <FormItem
                        layout={'vertical'}
                        name={'lastCheck'}
                        label={'Дата последней проверки'}
                    >
                        <DatePicker />
                    </FormItem>
                    <FormItem
                        layout={'vertical'}
                        name={'picture'}
                        label={'Фотография'}
                    >
                        <div className={s.draggerWrapper}>
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Нажмите или перетащите файлы для загрузки</p>
                                <p className="ant-upload-hint">
                                    Обратите внимание, что загружать можно только изображения размером до 50МБ.
                                </p>
                            </Dragger>
                        </div>
                    </FormItem>
                    <div className={s.footer}>
                        <Button type={'primary'} htmlType={'submit'}>Добавить</Button>
                        <Button type={'default'} onClick={() => {
                            setIsModalOpen(false)
                            form.resetFields()
                        }}>Отменить</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default DevicesPage