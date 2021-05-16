import { Modal, Button, Form, Input, InputNumber, Space, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { error } from './NoticeModals';


export const InfoModal = (props) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm(); 
    const { confirm } = Modal;
    const [editModel, setEditModel] = useState(false);

    let isEdit = props.type === 'edit';
    let isEditModel = (isEdit && editModel) || props.type === 'add';
    if(props.tableType === 'review') {
        //if the review has been done by the employee, it couldn't be edited.
        isEditModel = isEditModel && !props.info.hasBeenDone
    }

    const handleOk = async () => {
        setConfirmLoading(true);
        try {
            await props.saveInfo(form.getFieldsValue(true), props.info, isEdit ? 'edit' : 'add');
            setConfirmLoading(false);
            props.setVisible(false);
        } catch(e) {
            error((e && e.msg )|| 'There is an error, please try again~');
            setConfirmLoading(false);
        }
    };

    const handleCancel = () => {
        props.setVisible(false);
        props.onCancel({});
    };

    return (
        <Modal
            title={props.tableType}
            visible={true}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            {/*The item of user table */}
            {props.tableType === 'user' && <Form form={form} layout="vertical" name="userForm">
                <Form.Item
                    name="name"
                    label="user name"
                    rules={[
                        {required: true,},
                    ]}
                >
                    <Input defaultValue={props.info && props.info.name} disabled={!isEditModel}/>
                </Form.Item>
                <Form.Item
                    name="age"
                    label="age"
                    rules={[
                        {required: true,},
                    ]}
                >
                    <InputNumber defaultValue={props.info && props.info.age} disabled={!isEditModel}/>
                </Form.Item>
                <Form.Item
                    name="type"
                    label="type"
                    rules={[
                        {required: true,},
                    ]}
                >
                    {<Select defaultValue={props.info && props.info.userType} disabled={!isEditModel}>
                        <Select.Option value="Employee">Employee</Select.Option>
                        <Select.Option value="Admin">Admin</Select.Option>
                    </Select>}
                </Form.Item>
                {/* {
                    isEdit && (
                        <>
                            <Form.Item name="age" label="reviewed">
                                <span className='ant-form-text'>{props.info.reviewed}</span>
                            </Form.Item>
                            <Form.Item name="age" label="todo">
                                <span className='ant-form-text'>{props.info.todo}</span>
                            </Form.Item>
                            <Form.Item name="age" label="done">
                                <span className='ant-form-text'>{props.info.done}</span>
                            </Form.Item>
                        </>
                    )
                }  */}
            </Form>}
            {/*The item of review table */}
            {props.tableType === 'review' && <Form form={form} layout="vertical" name="userForm">
                <Form.Item
                    name="from"
                    label="from"
                    rules={[
                        {required: true,},
                    ]}
                >
                    <Select 
                        defaultValue={props.info && props.info.from} 
                        disabled={!isEditModel}>
                        {
                            props.allUsers.map((item, index) => (
                                <Select.Option key={index} value={item.name}>{item.name}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name="to"
                    label="to"
                    rules={[
                        {required: true,},
                    ]}
                >
                    <Select 
                        defaultValue={props.info && props.info.to} 
                        disabled={!isEditModel}
                    >
                        {
                            props.allUsers.map((item, index) => (
                                <Select.Option key={index} value={item.name}>{item.name}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                { isEdit && 
                 <>   
                    <Form.Item name="content" label="Content">
                        <span className='ant-form-text'>{props.info.content}</span>
                    </Form.Item>
                    <Form.Item name="hasBeenDone" label="Has Been Done">
                        <span className='ant-form-text'>{props.info.hasBeenDone ? 'yes' : 'no'}</span>
                    </Form.Item>
                    <Form.Item name="addPeople" label="Assigned By">
                        <span className='ant-form-text'>{props.info.addPeople}</span>
                    </Form.Item>
                </>}
                </Form>}
            {
                (isEdit && !editModel && (props.tableType !== 'review' || (props.tableType === 'review' && !props.info.hasBeenDone))) && 
                    (
                    <Space style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '5%',
                    }}>
                        <Button  onClick={() => {
                            setEditModel(true)
                        }}>
                            Edit
                        </Button>
                       {props.tableType === 'user' && <Button onClick={() => {
                            confirm({
                                title: 'Are you sure to delete the info of this person ?',
                                icon:  <ExclamationCircleOutlined />,
                                content: '',
                                okText: 'yes',
                                okType: 'danger',
                                cancelText: 'no',
                                onOk: async ()  => {
                                    try {
                                        await props.saveInfo({}, props.info, 'delete');
                                        props.setVisible(false);
                                    } catch(e) {
                                        error((e && e.msg )|| 'There is an error, please try again~');
                                    }
                                },
                            })
                        }} type="primary" danger>
                            Delete
                        </Button>}
                    </Space>)
            }
        </Modal>
    );
};


export const ReviewModal = (props) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm(); 
    //props.fromPerson
    const handleOk = async () => {
        setConfirmLoading(true);
        try {
            await props.saveInfo(form.getFieldsValue(true), props.info);
            setConfirmLoading(false);
            props.setVisible(false);
        } catch(err) {
            //modal 
            error(err.msg || 'There is an error, please try again~');
            setConfirmLoading(false);
        }
    };

    const handleCancel = () => {
        props.setVisible(false);
    };

    return (
        <Modal
            title={'review'}
            visible={true}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            {<Form form={form} layout="vertical" name="userForm">
                <Form.Item name="to" label="feedback to">
                    <span className='ant-form-text'>{props.info.review_to}</span>
                </Form.Item>
                <Form.Item
                    name="content"
                    label="content"
                    rules={[
                        {required: true},
                    ]}
                >
                    <Input.TextArea rows={5}/>
                </Form.Item>
            </Form>}
        </Modal>   
    );

}
