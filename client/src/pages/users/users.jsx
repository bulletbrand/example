import React, { useState } from 'react'
import './Users.css'
import { Space, Button, Input, Modal } from 'antd'
import { useDispatch } from 'react-redux'
import { userCrudAddAction } from '../../redux/actions/userCrudActions'
import UserCrudTable from './users-crud-table'
/*import API from '../../services/api-service'*/


//TODO implement redux saga after integration with backend
export default function UsersDemo() {

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalAddData, setModalAddData] = useState({ name: '', age: '', address: '', key: null })
  const dispatch = useDispatch()

  const showAddModal = () => setIsModalVisible(true)

  const modalSubmit = async () => {
    /* const data = API.post(modalAddData, 'user-crud/add')*/
    const newData = { ...modalAddData }
    newData['key'] = Math.floor(Math.random() * (10000 - 1)) + 1 //TODO here will be key from backend response
    dispatch(userCrudAddAction(modalAddData))
    setModalAddData({ name: '', age: '', address: '', key: '' })
    setIsModalVisible(false)
  }

  const modalCancel = () => setIsModalVisible(false)

  const modalFieldHandler = ({ target: { value, name: field } }) => {
    setModalAddData((state) => ({ ...state, [field]: value }))
  }

  return (
    <>
      <Space style={{ marginBottom: 16 }}><Button onClick={showAddModal}>Add new user</Button></Space>
      <Modal title='Add user' visible={isModalVisible} onOk={modalSubmit} onCancel={modalCancel}>
        <Input className='modalInput' value={modalAddData.name} name='name' onChange={modalFieldHandler}
               placeholder='name' />
        <Input className='modalInput' value={modalAddData.age} name='age' onChange={modalFieldHandler}
               placeholder='age' />
        <Input className='modalInput' value={modalAddData.address} name='address' onChange={modalFieldHandler}
               placeholder='address' />
      </Modal>
      <UserCrudTable />
    </>
  )
}


