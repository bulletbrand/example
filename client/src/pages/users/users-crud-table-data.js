import React from 'react'
import Popconfirm from 'antd/lib/popconfirm'
import Space from 'antd/lib/space'
import Typography from 'antd/lib/typography'
import PropTypes from 'prop-types'


const tableDataConfig = ({ isEditing, saveAfterEdit, onDeleteHanlder, onEditHandler, editingKey, cancel }) => {

  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      editable: true,
      render: text => <a href='#'>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: '25%',
      key: 'age',
      editable: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '25%',
      key: 'address',
      editable: true,
    },
    {
      title: 'Action',
      key: 'action',
      width: '25%',
      sorter: true,
      render: (record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <a style={{ margin: '5px' }} href='#' onClick={(e) => saveAfterEdit(e, record.key)}>Save</a>
            <Popconfirm title='Sure to cancel?'><a href='#' onClick={cancel}>Cancel</a></Popconfirm>
          </span>
        ) : (
          <Space size='middle'>
            <a href='#' onClick={() => onDeleteHanlder(record)}>Delete</a>
            <Typography.Link disabled={editingKey !== ''}
                             onClick={(e) => onEditHandler(e, record)}>Edit</Typography.Link>
          </Space>
        )
      },
    },
  ]
}

tableDataConfig.propTypes = {
  isEditing: PropTypes.bool,
  saveAfterEdit: PropTypes.func,
  onDeleteHanlder: PropTypes.func,
  onEditHandler: PropTypes.func,
  editingKey: PropTypes.string,
  cancel: PropTypes.func,
}

export default tableDataConfig