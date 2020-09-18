import React, { useEffect, useState } from 'react'
import EditComment from '../Modal/EditComment'

import Error505 from '../Results/Error505'
import axios from 'axios'
import { Row, Col, Typography, Tooltip } from 'antd';
import { EditFilled, CloseCircleFilled, } from '@ant-design/icons';

const { Title } = Typography

const CommentEdit = ({ blog, data, user, authenticated, blogObj, isdeleted, commentToEdit }) => {
  const [editButton, editCommentMethod] = useState(false)
  const [bool, remount] = useState(false)

  useEffect(() => {

    if (bool) {
      return
    }
  })

  const styles = {
    edit: {
      color: "dodgerBlue",
      cursor: "pointer"
    },
    delete: {
      color: "#d11a2a",
      cursor: "pointer"
    }
  }


  const deleteFeature = async (e) => {
    e.preventDefault()
    return await axios.delete('/blog/deletecomment', { params: { id: data, blogId: blog._id } })
      .then(res => {
        if (res.data.success_delete === "deleted-complete") {
          isdeleted()

        }
      }).catch(err => {
        return <Error505 />
      })

  }
  if (editButton) {
    return <EditComment id={data} content={commentToEdit} upload={remount} />
  }

  return (
    <Row justify="space-between">
      <Col style={{ marginRight: "30px" }}>
        <Tooltip color="black" title="Click me to Edit"><Title onClick={(e) => editCommentMethod(true)} type="secondary" style={styles.edit} level={5}>Edit<EditFilled /></Title> </Tooltip>
      </Col>
      <Col style={{ marginLeft: "30px" }}>
        <Tooltip color="black" title="Click me to Delete"> <Title onClick={(e) => deleteFeature(e)} type="secondary" style={styles.delete} level={5}>Delete<CloseCircleFilled /></Title></Tooltip>
      </Col>

    </Row >
  )
}


export default CommentEdit