import React, { useEffect, useState } from 'react';
import { Spin, Button, message } from 'antd';
import { ReviewModal } from '../Modal/Modal';
import { backend_prefix } from '../config';

export default function TodoList(props) {
    let [ todoList, setTodoList ] = useState([]);
    let [ loading, setLoading ] = useState(true);
    let [ showModal, setShowModal ] = useState(false);
    let [ toDo, setToDo ] = useState({});

    useEffect(() => {
        async function getData() {
            try {
                let res = await fetch(`${backend_prefix}/review/getReviewList`, {
                    method: "POST",
                    body: JSON.stringify({
                        now_user: props.username,
                    })
                }).then(res => res.json());
                if(res.code === 200) {
                    let todoList = res.data.filter(item => !item.has_done);
                    setTodoList(todoList);
                    setLoading(false);
                } else {
                    message.error(res.msg || 'An error occured, please refresh~');
                    setLoading(false);
                }
            } catch(e) {
                message.error(e.msg || 'An error occured, please refresh~');
                setLoading(false);
            }
        }
        getData();
    }, [props.username]);

    return (
        <div className='to_do_list_root' style={{
            minHeight: '500px',
            position: 'relative',
        }}>
            <div className='title' style={{
                fontSize: '30px',
                margin: '20px 10px'
            }}>
                ReviewList
            </div>

            {loading && <Spin style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}></Spin>}

            {!loading && (
                <>
                    <div className='tips' style={{
                        fontSize: '14px',
                        margin: '5px 10px',
                    }}>
                        { todoList.length > 0 ?  'Press the button to give the person your review~' : 'Good Job, All tasks have been done~'}
                    </div>

                    <div className='person' style={{marginTop: '10px'}}>
                        {
                            todoList.map((item, index) => {
                                return (
                                    <Button key={index} onClick={() => {
                                        setToDo(item);
                                        setShowModal(true);
                                    }} size={'large'} shape="round" style={{marginRight: '10px', marginTop: '10px'}}>
                                        {item.review_to}
                                    </Button>
                                )
                            })
                        }
                    </div>
                </>
            )}
            { showModal && <ReviewModal info={toDo} saveInfo={async (info)=>{
                let index = todoList.findIndex(e => e.review_id === toDo.review_id);
                let e = [...todoList];
                try {
                    let res = await fetch(`${backend_prefix}/review/completeReview`, {
                        method: 'POST',
                        body: JSON.stringify({
                            review_id: toDo.review_id,
                            content: info.content,
                        })
                    }).then(res => res.json());
                    if(res.code === 200 ){
                        e.splice(index, 1);
                        setTodoList(e);
                        return Promise.resolve();
                    } else {
                        return Promise.reject(res);
                    }
                }catch(err) {
                    return Promise.reject(err);
                }
            }} setVisible={setShowModal} from={props.username}/>}
        </div>
    )
}