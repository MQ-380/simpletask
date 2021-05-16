import React, { useState, useEffect} from 'react';
import { message } from 'antd';
import CommonTable from '../CommonTable/CommonTable';
import { backend_prefix } from '../config';


export default function UserInfo () {
    let [ originData, setOriginData ] = useState([]);
    let [ showModalType, setShowModalType ] = useState(false);
    let [ clickedInfo, setClickedInfo ] = useState({});
    let [ loading, setLoading ] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                let res = await fetch(`${backend_prefix}/users/users`).then(res => res.json());
                if(res.code === 200) {
                    setOriginData(res.data);
                    setLoading(false);
                } else {
                    message.error(res.msg ||  'An error occured, please refresh~');
                    setLoading(false);
                }
            } catch (e) {
                message.error(e.msg || 'An error occured, please refresh~');
                setLoading(false);
            }
        }
        getData();
    }, []);

    const columns =[
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 50,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 50,
        },
        {
            title: 'Type',
            dataIndex: 'userType',
            key: 'userType',
            width: 90,
        },
        // {
        //     title: 'Reviewed',
        //     dataIndex: 'reviewed',
        //     key: 'reviewed',
        //     sorter: (a,b) => a.reviewed - b.reviewed,
        //     sortDirections: ['descend', 'ascend'],
        //     width: 20,
        // },
        // {
        //     title: 'Todo',
        //     dataIndex: 'todo',
        //     key: 'todo',
        //     sorter: (a,b) => a.todo - b.todo,
        //     sortDirections: ['descend', 'ascend'],
        //     width: 20,
        // },
        // {
        //     title: 'Done',
        //     dataIndex: 'done',
        //     key: 'done',
        //     sorter: (a,b) => a.done - b.done,
        //     sortDirections: ['descend', 'ascend'],
        //     width: 20,
        // },
    ]

    const saveInfo = async (info, prevRecord, model) => {
        // getInfo from backend
        let e = [...originData];
        if(model === 'edit') {
            let index = e.findIndex(item => item.key === prevRecord.key);
            if(index >= 0) {
                let item = e[index];
                if(info.name) item.name = info.name;
                if(info.age) item.age = info.age;
                if(info.type) item.userType = info.type;
                try {
                    let res = await fetch(`${backend_prefix}/users/editUser`, {
                        method: 'POST',
                        body: JSON.stringify(item)
                    });
                    if(res.code === 200) {
                        e[index] = item;
                    } else {
                        return Promise.reject();
                    }
                } catch(ey) {
                    return Promise.reject();
                }
  
            }
        } else if(model === 'add') {
            try {
                let res = await fetch(`${backend_prefix}/users/addUser`, {
                    method: 'POST', 
                    body: JSON.stringify({
                        username: info.name,
                        usertype: info.type,
                        age: info.age
                    })
                }).then(res => res.json());
                if(res.code === 200) {
                    e = res.newData;
                } else {
                    setClickedInfo({});
                    return Promise.reject();
                }
            } catch(e) {
                setClickedInfo({});
                return Promise.reject();
            }
        } else if(model === 'delete') {
            let index = e.findIndex(item => item.key === prevRecord.key);
            try {
                let res = await fetch(`${backend_prefix}/users/delUser`, {
                    method: 'POST', 
                    body: JSON.stringify({
                        user_id: e[index].key
                    })
                });
                if(res.status === 200) {
                    e.splice(index,1);
                } else {
                    return Promise.reject();
                }
            } catch(e) {
                setClickedInfo({});
                return Promise.reject();
            }
        }
        setOriginData(e);
        setClickedInfo({});
        return Promise.resolve();
    }

    return  (
        <div className='user_info_root'>
            <CommonTable
                setShowModalType={setShowModalType} 
                originData={originData}
                columns={columns}
                showModalType={showModalType}
                saveInfo={saveInfo}
                clickedInfo={clickedInfo}
                setClickedInfo={setClickedInfo} 
                loading={loading}
                tableType={'user'}
            />
        </div>
    )
}