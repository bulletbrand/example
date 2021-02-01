import React, { useState } from 'react'
import Form from 'antd/lib/form'
import Table from 'antd/lib/table'
import EditableCell from './users-crud-table-cell'
import tableDataConfig from './users-crud-table-data'
import { useDispatch, useSelector } from 'react-redux'
import { userCrudDataSelector } from '../../utils/selectors'
import { userCrudDeleteAction, userCrudEditAction } from '../../redux/actions/userCrudActions'


const UserCrudTable = () => {
  const [form] = Form.useForm()
  const data = useSelector(userCrudDataSelector)
  const [editingKey, setEditingKey] = useState('')
  const isEditing = (record) => record.key === editingKey

  const dispatch = useDispatch()

  const cancel = () => setEditingKey('')

  const onDeleteHanlder = (record) => dispatch(userCrudDeleteAction(record))

  const saveAfterEdit = async (e, key) => {
    e.preventDefault()
    try {
      const newRow = await form.validateFields()
      const indexRow = data.findIndex((item) => key === item.key)
      newRow['key'] = indexRow
      dispatch(userCrudEditAction({ newRow, indexRow }))
      setEditingKey('')
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const onEditHandler = (e, record) => {
    e.preventDefault()
    form.setFieldsValue({ name: '', age: '', address: '', ...record })
    setEditingKey(record.key)
  }

  const columns = tableDataConfig({
    isEditing, saveAfterEdit, onDeleteHanlder, onEditHandler, editingKey, cancel,
  })

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  return (
    <Form form={form} component={false}>
      <Table components={{ body: { cell: EditableCell } }} columns={mergedColumns} dataSource={data} />
    </Form>
  )
}

export default UserCrudTable