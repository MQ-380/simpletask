import { Layout, Menu, Modal, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css';
import './Home.scss';
import { useState } from 'react';
import  UserInfo  from '../UserInfo/UserInfo';
import ReviewInfo from '../ReviewInfo/ReviewInfo';
import TodoList from '../TodoList/TodoList';


export default function Home(props){
    const {Header, Content, Footer } = Layout;
    const { user: {userType, name} } = props;

    let [ menuContent, setMenuContent ] = useState(userType === 'Admin' ? '0' : '2');

    return(
        <Layout className='layout'>
            <Header style={{position: 'fixed', zIndex:'5', width: '100%', padding: 0}}>
                <div className='logo'></div>
                <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[menuContent]} onClick={(e) => setMenuContent(e.key)}>
                    {userType === 'Admin' && (<>
                        <Menu.Item key='0'>User</Menu.Item>
                        <Menu.Item key='1'>Review</Menu.Item>
                    </>)}
                    {userType === 'Employee' && <Menu.Item key='2'>Review</Menu.Item>}
            </Menu>
                <Button className='icon' onClick={() => {
                    Modal.confirm({
                        title: 'Are you sure to logout?',
                        content: '',
                        okText: 'Sure',
                        okType: 'danger',
                        cancelText: 'Cancel',
                        onOk: async ()  => {
                            props.setLogOut();
                        },
                    })
                }}>
                    {userType}
                    <UserOutlined/>
                </Button>
            </Header>
            <Content style={{padding: '0 10px', marginTop: 64}}>
                {menuContent === '0' && <UserInfo username={name}/>}
                {menuContent === '1' && <ReviewInfo username={name}/>}
                {menuContent === '2' && <TodoList username={name}/>}
            </Content>
            <Footer style={{textAlign: 'center'}}>AAAA</Footer>
        </Layout>
    )
}
