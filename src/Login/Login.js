
import { Form, Input, Button, message } from 'antd';
import { backend_prefix } from '../config';
export default function Login(props) {
    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 8,
          span: 16,
        },
      };
      
        const onFinish = async (values) => {
            try {
                let res = await fetch(`${backend_prefix}/login`, {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify({
                        user_name: values.username,
                    })
                }).then(res => res.json());
                if(res.code === 200) {
                    props.loginSuccess({username: res.data[0].user_name, userType: res.data[0].user_type});
                } else {
                    message.error('check your username again~');
                }
            } catch(e) {
                message.error('something error, please try again~');
            }
            
        };
      
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };
      
        return (
            <div className='login_form' style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>
      
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          </div>
    );
}

