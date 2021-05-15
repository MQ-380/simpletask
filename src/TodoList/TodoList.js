import React, { useEffect, useState } from 'react';
import { Spin, Button } from 'antd';
import { ReviewModal } from '../Modal/Modal';

export default function TodoList(props) {
    let [ todoList, setTodoList ] = useState([]);
    let [ loading, setLoading ] = useState(true);
    let [ showModal, setShowModal ] = useState(false);
    let [ toDo, setToDo ] = useState({});


    useEffect(() => {
        let data = [];
        for(let i = 0; i < 4; i++) {
            data.push({
                key: i.toString(),
                from: `User 1`,
                to: `User ${20-i}`,
            });
        }

        setTimeout(() => {
            setTodoList(data);
            setLoading(false);
        }, 1000)
    }, []);


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
                                        {item.to}
                                    </Button>
                                )
                            })
                        }
                    </div>
                </>
            )}
            { showModal && <ReviewModal info={toDo} saveInfo={()=>{
                let index = todoList.findIndex(e => e.to === toDo.to);
                let e = [...todoList];
                index >= 0 && e.splice(index, 1);
                setTodoList(e);
            }} setVisible={setShowModal} from={props.fromPerson}/>}
        </div>
    )
}