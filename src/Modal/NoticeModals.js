import { Modal } from 'antd';

export function error(errmsg) {
    Modal.error({
      title: 'This is an error message',
      content: `${errmsg}`,
    });
}