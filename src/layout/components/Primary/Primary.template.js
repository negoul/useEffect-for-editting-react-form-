import {Layout} from 'antd';
import {Header, Sidebar} from 'components';
import style from './Primary.module.scss';

export const PrimaryTemplate = ({children, visible, setVisible,collapsed,setCollapsed}) => {
  return (
    <Layout className={style.main}>
      <Sidebar visible={visible} setVisible={setVisible} collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout className={style.contentWrapper}>
        <Header setVisible={setVisible} collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout.Content className={`${style.content}`}>
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
