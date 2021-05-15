import React, { useState, useEffect} from 'react';
import CommonTable from '../CommonTable/CommonTable';

export default function ReviewInfo (props) {
    let [ originData, setOriginData ] = useState([]);
    let [ allUsers, setAllUsers ] = useState([]);
    let [ showModalType, setShowModalType ] = useState(false);
    let [ clickedInfo, setClickedInfo ] = useState({});
    let [ loading, setLoading ] = useState(true);
    let userFilter = [];

    useEffect(() => {
        let data = [];
        let user = [];
        // get user info api;
        for(let i = 0; i < 20; i++) {
            data.push({
                key: i.toString(),
                from: `User ${i}`,
                to: `User ${20-i}`,
                content: '由于一直在用 vue 写业务，为了熟悉下 react 开发模式，所以选择了 react。数据库一开始用的是 mongodb，后来换成 mysql 了，一套下来感觉 mysql 也挺好上手的。react-router、koa、mysql 都是从0开始接触开发的，期间遇到过很多问题，印象最深的是 react-router 参考官方文档配置的，楞是跑不起来，花费了好几个小时，最后才发现看的文档是v1.0, 而项目中是v4.3， 好在可参考的资料比较多，问题都迎刃而解了。',
                hasBeenDone: i % 2 ,
                addPeople: 'admin1',
            });
            user.push({
                name: `User ${i}`,
            })
        }
        user.push({
            name: 'admin1', isAdmin: true
        }, {name:" admin3", isAdmin: true})
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