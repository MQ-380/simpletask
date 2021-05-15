import { Layout, Menu, Dropdown, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css';
import './Home.scss';
import { useState } from 'react';
import  UserInfo  from '../UserInfo/UserInfo';


export default function Home(props){
    const {Header, Content, Footer } = Layout;
    const { user: {userType} } = props;

    let [ menuContent, setMenuContent ] = useState(userType === 'admin' ? '0' : '2');

    const handleMenuClick = (e) =>{
        console.log(e.key);
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
        <Menu.Item key="1" icon={<UserOutlined />}>
            User Info
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    )


    return(
        <Layout className='layout'>
            <Header style={{position: 'fixed', zIndex:'1', width: '100%', padding: 0}}>
                <div className='logo'></div>
                <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[menuContent]} onClick={(e) => setMenuContent(e.key)}>
                    {userType === 'admin' && (<>
                        <Menu.Item key='0'>User</Menu.Item>
                        <Menu.Item key='1'>Review</Menu.Item>
                    </>)}
                    {userType === 'normal' && <Menu.Item key='2'>Review</Menu.Item>}
            </Menu>
                <Dropdown overlay={menu}  className='icon'>
                    <Button>
                        {userType}
                        <UserOutlined/>
                    </Button>
                </Dropdown>
            </Header>
            <Content style={{padding: '0 10px', marginTop: 64}}>
                {menuContent === '0' && <UserInfo/>}
                {/* {menuContent === '1' && <ReviewInfo/>}
                {menuContent === '2' && <Review/>} */}
            </Content>
            <Footer style={{textAlign: 'center'}}>AAAA</Footer>
        </Layout>
    )
}
