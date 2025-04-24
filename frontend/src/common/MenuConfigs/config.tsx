import {
  ApiOutlined,
  BugOutlined,
  BuildOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {getItem, MenuItem} from '../utils/helpers';
import {ItemType} from 'antd/es/menu/interface';
import {IUserRoles} from '../../store/userStore';
import {messages} from '../constants/messages';
import {Avatar, Badge, Space} from "antd";

interface IHeaderOptions {
  [key: string]: ItemType[];
}

type ILeftSideOptions = {
  [key in IUserRoles]: MenuItem[];
};

const source = messages.view.main.layoutOptions;

export const LEFT_SIDE_OPTIONS_LIST: ILeftSideOptions = {
  administrator: [
    getItem(source.user, 'user/profile', <UserOutlined />),
    getItem(source.about, 'about', <InfoCircleOutlined />),
    getItem(source.support, 'support', <BugOutlined />),
  ],
  user: [
    getItem(source.user, 'profile', <UserOutlined />),
    getItem(source.tasks, 'tasks', <BuildOutlined />),
    getItem(source.about, 'about', <InfoCircleOutlined />),
    getItem(source.support, 'support', <BugOutlined />),
  ],
  support: [
    getItem(source.about, 'about', <InfoCircleOutlined />),
    getItem(source.support, 'support', <BugOutlined />),
  ],
};

export const HEADER_OPTIONS = [
  getItem(source.profile, 'profile', <UserOutlined />),
  getItem(
      source.calendar,
      'calendar',
      <CalendarOutlined />
  ),
  getItem(
      source.devices,
      'devices',
      <Space>
        <Badge count={1}>
          <Avatar size={40} style={{background: '#eeeeee'}} shape="circle" icon={<ApiOutlined style={{fontSize: '17px', color: 'black'}} />} />
        </Badge>
      </Space>
  ),
  getItem(source.support, 'support', <BugOutlined />),
  getItem(source.about, 'about', <InfoCircleOutlined />),
];
