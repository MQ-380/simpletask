import { Modal, Button, Form, Input, InputNumber, Space, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';


export const UserInfoModal = (props) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    //const [modalText, setModalText] = useState('Content of the modal');
    const [form] = Form.useForm(); 
    const { confirm } = Modal;

    const [editModel, setEditModel] = useState(false);
    let isEdit = props.type === 'edit';
    let isEditModel = (isEdit && editModel) || props.type === 'add';

    const handleOk = () => {
        //setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            props.saveInfo(form.getFieldsValue(true), props.userInfo, isEdit ? 'edit' : 'add');
            setConfirmLoading(false);
            props.setVisible(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        props.setVisible(false);
        props.onCancel({});
    };

    return (
        <>
        <Modal
            title="Title"
            visible={true}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Form form={form} layout="vertical" name="userForm">
                <Form.Item
                    name="name"
                    label="user name"
                    rules={[
                        {required: true,},
                    ]}
                >
                    {<Input defaultValue={props.userInfo && props.userInfo.name} disabled={!isEditModel}/>}
                    {/* {!isEditModel && (
                        <span className='ant-form-text'>{props.userInfo.name}</span> 
                    )} */}
                </Form.Item>
                <Form.Item
                    name="age"
                    label="age"
                    rules={[
                        {required: true,},
                    ]}
                >
                    {<InputNumber defaultValue={props.userInfo && props.userInfo.age} disabled={!isEditModel}/>}
                    {/* {!isEditModel && (
                        <span className='ant-form-text'>{props.userInfo.age}</span> 
                    )} */}
                </Form.Item>
                <Form.Item
                    name="type"
                    label="type"
                    rules={[
                        {required: true,},
                    ]}
                >
                    {<Select defaultValue={props.userInfo && props.userInfo.userType} disabled={!isEditModel}>
                        <Select.Option value="normal">Employee</Select.Option>
                        <Select.Option value="admin">Admin</Select.Option>
                    </Select>}
                    {/* {!isEditModel && (
                        <span className='ant-form-text'>{props.userInfo.age}</span> 
                    )} */}
                </Form.Item>
                {
                    isEdit && (
                        <>
                            <Form.Item name="age" label="reviewed">
                                <span className='ant-form-text'>{props.userInfo.reviewed}</span>
                            </Form.Item>
                            <Form.Item name="age" label="todo">
                                <span className='ant-form-text'>{props.userInfo.todo}</span>
                            </Form.Item>
                            <Form.Item name="age" label="done">
                                <span className='ant-form-text'>{props.userInfo.done}</span>
                            </Form.Item>
                        </>
                    )
                } 
            </Form>
            {
                (isEdit && !editModel) && 
                    (
                    <Space style={{
                        position: 'absolute',
                        bottom: '100px',
                        right: '5%',
                    }}>
                        <Button  onClick={() => {
                            setEditModel(true)
                        }}>
                            Edit
                        </Button>
                        <Button onClick={() => {
                            confirm({
                                title: 'Are you sure to delete the info of this person ?',
                                icon:  <ExclamationCircleOutlined />,
                                content: '',
                                okText: 'yes',
                                okType: 'danger',
                                cancelText: 'no',
                                onOk() {
                                    props.saveInfo({}, props.userInfo, 'delete');
                                    setConfirmLoading(false);
                                    props.setVisible(false);
                                },
                            })
                        }} type="primary" danger>
                            Delete
                        </Button>
                    </Space>)
            }
        </Modal>
        </>
    );
};
