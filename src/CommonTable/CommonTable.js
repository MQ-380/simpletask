import React, { useState, useEffect} from 'react';
import { Space, Table, Button } from 'antd';
import { InfoModal } from '../Modal/Modal';

export default function CommonTable(props) {
    let {setShowModalType, originData, columns, showModalType, saveInfo, clickedInfo, setClickedInfo, loading, tableType} = props;
    return (
        <>
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
            scroll={{x: 500}}/>
        {showModalType && <InfoModal tableType={tableType} setVisible={setShowModalType} saveInfo={saveInfo} type={showModalType} info={clickedInfo} onCancel={setClickedInfo} allUsers={props.allUsers}/>}
    </>
    )
}