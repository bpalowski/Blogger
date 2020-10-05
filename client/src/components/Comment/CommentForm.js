import React, { useState } from 'react'
import { updateBloggs } from '../../state/actions/blogger'

import { Comment, Avatar, Form, Button, Input, Alert } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import Error505 from '../Results/Error505'
import Axios from 'axios';
const { TextArea } = Input;


const CommentForm = ({ userData, dataBlog, updateBloggs, updateGet, didSubmit }) => {

  const [form] = Form.useForm();
  const [value, inputText] = useState('')
  const [error, errorBool] = useState(false)

  const onFinish = (data) => {
    if (data) {
      commentData(data)
    }
    return form.resetFields()
  }

  const commentData = (data) => {
    return Axios.post(`/blog/comment`, {

      _id: dataBlog._id,
      comment: data.textArea

    }).then(res => {
      updateBloggs(true)
      updateGet(true)
      didSubmit(true)
    }).catch(err => {
      return <Error505 />
    })
  }



  if (error) {
    return <Alert
      message="You must input text to comment"
      type="error"
      closable
      onClose={() => errorBool(false)}
      showIcon />
  }
  return (
    <>
      <Comment
        avatar={
          <Avatar
            icon={<UserOutlined />}
            src={userData.image}
            alt="Han Solo"
          />
        }
        content={
          <>

            <Form name="form1" form={form} onFinish={onFinish}>
              <Form.Item name="textArea"
              >
                <TextArea name="comment" required
                  rows={1} onChange={(e) => inputText(e.target.value)} value={value} />
              </Form.Item>
              <Form.Item rules={[
                {
                  required: true,
                },
              ]}>
                <Button htmlType="submit" type="primary" >
                  Add Comment
            </Button>
              </Form.Item>
            </Form>
          </>
        }
      />
    </>
  )
}



const mapStateToProps = state => ({
  publicBlogs: state.bloggerData.publicBlogs,
  userData: state.userData.userData,

});
const mapDispatchToProps = { updateBloggs };
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)