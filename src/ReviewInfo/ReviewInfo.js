import React, { useState, useEffect} from 'react';
import { message } from 'antd';
import CommonTable from '../CommonTable/CommonTable';
import {backend_prefix} from '../config';

export default function ReviewInfo (props) {
    let [ originData, setOriginData ] = useState([]);
    let [ allUsers, setAllUsers ] = useState([]);
    let [ showModalType, setShowModalType ] = useState(false);
    let [ clickedInfo, setClickedInfo ] = useState({});
    let [ loading, setLoading ] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                let p1 = await fetch(`${backend_prefix}/review/reviews`).then(res => res.json());
                let p2 = await fetch(`${backend_prefix}/users/users`).then(res => res.json());
                if(p1.code === 200 && p2.code === 200) {
                    setOriginData(p1.data);
                    setAllUsers(p2.data.map(e=>({name: e.name, isAdmin: e.userType === 'Admin'})));
                    setLoading(false);
                } else {
                    message.error(p1.msg || p2.msg ||  'An error occured, please refresh~');
                    setLoading(false);
                }
            } catch(e) {
                message.error('An error occured, please refresh~');
                setLoading(false);
            }
        }
        getData();
    }, []);

    const getAllUserFilter = () => (
        allUsers.map(e => (
            {text: e.name, value: e.name}
        ))
    )

    const getAllAdminFilter = () => {
        allUsers.filter(e => e.isAdmin).map( e => (
            {text: e.name, value: e.name}
        ))
    }

    const columns =[
        {
            title: 'Number',
            dataIndex: 'key',
            key: 'key',
            fixed: 'left',
            width: 20,
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
            width: 20,
            filters: getAllUserFilter(),
            onFilter: (value, record) => record.from === (value),
        },
        {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
            width: 20,
            filters: getAllUserFilter(),
            onFilter: (value, record) => record.to === (value),
        },
        {
            title: 'content',
            dataIndex: 'content',
            key: 'content',
            width: 50,
            render: (content) => {
                if(content.length > 100) return content.slice(0,100) + '...'
                else return content
            }
        },
        {
            title: 'Done',
            dataIndex: 'hasBeenDone',
            key: 'hasBeenDone',
            render: (done) => (done ? 'yes' : 'no'),
            width: 20,
        },
        {
            title: 'Assigned by',
            dataIndex: 'addPeople',
            key: 'addPeople',
            width: 20,
            filters: getAllAdminFilter(),
            onFilter: (value, record) => record.addPeople.includes(value),
        },
    ]

    const saveInfo = async (info, prevRecord, model) => {
        let e = [...originData];
        if(model === 'edit') {
            let index = e.findIndex(item => item.key === prevRecord.key);
            if(index >= 0) {
                let item = e[index];
                if(info.from) item.from = info.from;
                if(info.to) item.to = info.to;
                try {
                    let res = await fetch(`${backend_prefix}/review/editReview`, {
                        method: 'POST',
                        body: JSON.stringify(item)
                    })
                    if(res.status === 200) {
                        e[index] = item;
                    } else {
                        setClickedInfo({});
                        return Promise.reject();
                    }
                } catch(e) {
                    setClickedInfo({});
                    return Promise.reject();
                }
            }
        } else if(model === 'add') {
            try {
                let res = await fetch(`${backend_prefix}/review/addReview`, {
                    method: 'POST', 
                    body: JSON.stringify({
                        from: info.from,
                        to: info.to,
                        content: '',
                        addPeople: props.username,
                    })
                });
                if(res.status === 200) {
                    e.unshift({
                        key: e.length + 1,
                        from: info.from,
                        to: info.to,
                        content: '',
                        hasBeenDone: false,
                        addPeople: props.username,
                    });
                } else {
                    setClickedInfo({});
                    return Promise.reject();
                }
            } catch(ey) {
                setClickedInfo({});
                return Promise.reject();
            }
        }
        setOriginData(e);
        setClickedInfo({});
        return Promise.resolve();
    }

    return  (
        <div className='review_info_root'>
            <CommonTable
                setShowModalType={setShowModalType} 
                originData={originData}
                columns={columns}
                showModalType={showModalType}
                saveInfo={saveInfo}
                clickedInfo={clickedInfo}
                setClickedInfo={setClickedInfo} 
                loading={loading}
                tableType={'review'}
                allUsers={allUsers}
            />
        </div>
    )
}