import React, { useState } from 'react'
import Error505 from '../Results/Error505'
import axios from 'axios'
import { Row, Col, Typography, Tooltip } from 'antd';
import { EditFilled, CloseCircleFilled, } from '@ant-design/icons';
import { Redirect } from 'react-router';
const { Title } = Typography

const AuthEditDelete = ({ user, authenticated, blogObj, isdeleted }) => {
  const [editButton, editMethod] = useState(false)



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


  const editFeature = () => {
    editMethod(true)
  }

  const deleteFeature = async () => {
    await axios.delete('/blog/deleteblog', { params: { id: blogObj._id } })
      .then(res => {
        if (res.data.success_delete === "deleted-complete") {
          isdeleted(true)
        }
      }).catch(err => {
        return <Error505 />
      })

  }




  if (editButton) {
    return <Redirect to={{ pathname: `/editblog`, blog: blogObj, userObj: user, auth: authenticated }} key={user} />
  }
  return (
    <Row justify="space-between">
      <Col>
        <Tooltip color="black" title="Click me to Edit"><Title onClick={editFeature} style={styles.edit} level={4}>Edit<EditFilled /></Title> </Tooltip>
      </Col>
      <Col>
        <Tooltip color="black" title="Click me to Delete"> <Title onClick={(e) => deleteFeature()} style={styles.delete} level={4}>Delete<CloseCircleFilled /></Title></Tooltip>
      </Col>

    </Row >
  )
}


export default AuthEditDelete