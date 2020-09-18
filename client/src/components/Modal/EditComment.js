import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Error from '../Results/Error505'
import { connect } from 'react-redux'
import { Modal, Form, Card, Input, Button, Row } from 'antd';


import { setMyBlog, setPublicBlogs } from '../../state/actions/blogger';




const EditComment = ({ id, content, setPublicBlogs }) => {
  const [visible, setModal] = useState(true)
  const [spinner, spinModal] = useState(false)
  const [sent, updateSent] = useState()
  const [form] = Form.useForm();

  const styles = {
    rowStyles: {
      height: "30vh"
    },
    cardStyles: {
      border: "none", height: "20vh", width: "70%"
    },
    formStyle: { border: 'none', textAlign: 'center' },
    buttonStyle: {
      marginTop: 10
    }
  }
  useEffect(() => {
    if (sent) {
      sendData()
    }

    form.setFieldsValue({
      comment: content
    })


  })

  const handleCancel = e => {
    window.location.reload(false);
    spinModal(true)
  };

  const onFinish = async (values) => {

    updateSent(values.comment)
  }

  const sendData = async () => {
    let res = await axios.post('/blog/editcomment', {
      id: id,
      comment: sent
    });
    if (res.data.edit_success) {

      return axios.get('/blog/myblogs')
        .then(res => {
          setPublicBlogs()
          setModal(false)
          updateSent('')
          window.location.reload();
        }).catch(err => {
          console.log(err)
        })
    } else {
      return <Error />
    }
  }

  return (
    <>

      <Modal
        closable={false}
        footer={null}
        visible={visible}
        onCancel={(e) => handleCancel(e)}

        confirmLoading={spinner}
        destroyOnClose={true}
      >
        <Row justify="center" style={styles.rowStyles}>

          <Card style={styles.cardStyles}>

            <Form
              form={form}
              id="formId"
              style={styles.formStyle}
              size="middle"
              onFinish={onFinish}
            >

              <Form.Item
                name='comment'
                rules={[{ required: true, message: 'Comment is required' }]}
              >
                <Input
                />
              </Form.Item>
              <Button form="formId" size="large" htmlType="submit" style={styles.buttonStyle} type="primary">Edit Comment</Button>

            </Form>
          </Card>


        </Row>

      </Modal>


    </>
  )
}


const mapStateToProps = state => ({
  authenticated: state.userData.authenticated,
});
const mapDispatchToProps = { setMyBlog, setPublicBlogs };
export default connect(mapStateToProps, mapDispatchToProps)(EditComment)