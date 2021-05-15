import React, { useState, useEffect} from 'react';
import { Space, Table, Button } from 'antd';
import { UserInfoModal } from '../Modal/Modal';


export default function UserInfo () {
    let [ originData, setOriginData ] = useState([]);
    let [ showModalType, setShowModalType ] = useState(false);
    let [ clickedInfo, setClickedInfo ] = useState({});
    let [ loading, setLoading ] = useState(true);

    useEffect(() => {
        let data = [];
        // get user info api;
        for(let i = 0; i < 20; i++) {
            data.push({
                key: i.toString(),
                name: `User ${i}`,
                age: i + 20,
                reviewed: i+9,
                todo: 4,
                done: 4,
                userType: 'normal',
            });
        }
        setTimeout(() => {
            setOriginData(data);
            setLoading(false);
        }, 1000)

    }, []);

    const columns =[
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 20,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 20,
        },
        {
            title: 'Type',
            dataIndex: 'userType',
            key: 'userType',
            width: 30,
        },
        {
            title: 'Reviewed',
            dataIndex: 'reviewed',
            key: 'reviewed',
            sorter: (a,b) => a.reviewed - b.reviewed,
            sortDirections: ['descend', 'ascend'],
            width: 20,
        },
        {
            title: 'Todo',
            dataIndex: 'todo',
            key: 'todo',
            sorter: (a,b) => a.todo - b.todo,
            sortDirections: ['descend', 'ascend'],
            width: 20,
        },
        {
            title: 'Done',
            dataIndex: 'done',
            key: 'done',
            sorter: (a,b) => a.done - b.done,
            sortDirections: ['descend', 'ascend'],
            width: 20,
        },
    ]

    const saveInfo = (info, prevRecord, model) => {
        // getInfo from backend
        console.log('123', info);
        let e = [...originData];
        if(model === 'edit') {
            let index = e.findIndex(item => item.key === prevRecord.key);
            if(index >= 0) {
                let item = e[index];
                if(info.name) item.name = info.name;
                if(info.age) item.age = info.age;
                if(info.type) item.userType = info.type;
                e[index] = item;
            }
        } else if(model === 'add') {
            e.unshift({
                key: e.length.toString(),
                name: info.name,
                age: info.age,
                reviewed: 9,
                todo: 4,
                done: 4,
                userType: info.type,
            });
        } else if(model === 'delete') {
            let index = e.findIndex(item => item.key === prevRecord.key);
            console.log(index);
            e.splice(index,1);
        }
        
        setOriginData(e);
        setClickedInfo({});
    }

    return  (
        <div className='user_info_root'>
            <Space style={{margin: '7px'}}>
                <Button onClick={() => {
                    setShowModalType('add');
                }}>add</Button>
            </Space>
            <Table columns={columns} dataSource={originData} sticky={{offsetHeader: 64}} 
                loading={loading}
                onRow={record => {
                    return {
                        onClick: e => {
                            console.log(record);
                            setShowModalType('edit');
                            setClickedInfo(record);
                        }
                    }
                }}
                scroll={{x: 700}}/>
            {showModalType && <UserInfoModal setVisible={setShowModalType} saveInfo={saveInfo} type={showModalType} userInfo={clickedInfo} onCancel={setClickedInfo}/>}
        </div>
    )
}