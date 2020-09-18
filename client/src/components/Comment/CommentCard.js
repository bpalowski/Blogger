import React, { } from 'react'
import CommentEdit from '../Auth/CommentEdit'
import { connect } from 'react-redux'

import { Comment, Tooltip, Avatar, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
const CommentCard = ({ blogObj, admin, updateDelete, postedBy, info, name, comment, avatar, date, userobj }) => {
  const [getrefresh, upload] = useForm(false)

  const actions = [
    <Row style={{}}>
      <CommentEdit blog={blogObj} isdeleted={updateDelete} key={userobj} data={info} commentToEdit={comment} remount={upload} />
    </Row>
  ];
  const styles = {
    card: {
      padding: "2%",
      margin: "5px",
      boxShadow: "0px 1px 5px 0px #676767",
    }
  }
  return (
    <>

      <div style={styles.card}>
        <Comment
          actions={admin || postedBy === userobj.id ? actions : ''}
          // author={<a>{name}</a>}
          avatar={
            <Avatar
              src={avatar}
              alt="card image"
            />
          }
          content={
            <p>
              {comment}
            </p>
          }
          datetime={
            <Tooltip>
              <span>{date}</span>
            </Tooltip>
          }
        >
        </Comment>
      </div>
    </>
  )
}
const mapStateToProps = state => ({

  userData: state.userData.userData,
  authenticated: state.userData.authenticated,
  publicBlogs: state.bloggerData.publicBlogs,
  myBlogs: state.bloggerData.myBlogs,
  updateBlog: state.bloggerData.updateBlog,
  currentBlog: state.bloggerData.currentBlog
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(CommentCard)

