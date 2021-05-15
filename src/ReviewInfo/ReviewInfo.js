import React, { useState, useEffect} from 'react';
import CommonTable from '../CommonTable/CommonTable';

export default function ReviewInfo (props) {
    let [ originData, setOriginData ] = useState([]);
    let [ allUsers, setAllUsers ] = useState([]);
    let [ showModalType, setShowModalType ] = useState(false);
    let [ clickedInfo, setClickedInfo ] = useState({});
    let [ loading, setLoading ] = useState(true);

    useEffect(() => {
        let data = [];
        let user = [];
        // get user info api;
        for(let i = 0; i < 20; i++) {
            data.push({
                key: i.toString(),
                from: `User ${i}`,
                to: `User ${20-i}`,
                content: '21',
                hasBeenDone: i % 2 ,
                addPeople: props.name,
            });
            user.push({
                name: `User ${i}`,
            })
        }
        user.push({
            name: 'Admin1', isAdmin: true
        }, {name:" Admin3", isAdmin: true})
        setTimeout(() => {
            setOriginData(data);
            setAllUsers(user);
            setLoading(false);
        }, 1000)

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

    const saveInfo = (info, prevRecord, model) => {
        // getInfo from backend
        console.log('123', info);
        let e = [...originData];
        if(model === 'edit') {
            let index = e.findIndex(item => item.key === prevRecord.key);
            if(index >= 0) {
                let item = e[index];
                if(info.from) item.from = info.from;
                if(info.to) item.to = info.to;
                e[index] = item;
            }
        } else if(model === 'add') {
            e.unshift({
                key: e.length,
                from: info.from,
                to: info.to,
                content: '',
                hasBeenDone: false,
                addPeople: props.nowUser,
            });
        }
        
        setOriginData(e);
        setClickedInfo({});
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