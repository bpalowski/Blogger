import React, { PureComponent } from 'react';
import CommentCard from './CommentCard'



import { Spin } from 'antd';


import { connect } from 'react-redux'
import { setMyBlog, updateBloggs, publicBloggs, setPublicBlogs, setBlog } from '../../state/actions/blogger'
import getComments from '../../utils/blog'

const styles = {
  row1: {
    marginBottom: "10px"
  },
  commentBoardContainer: {
    marginTop: "50px",
  },
  card: {
    marginTop: "20px",
  }
}

class CardBody extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      didMount: false,
      comments: [],
      updateNewList: [],
      newCardList: [],
      deleted: false
    }
  }

  componentDidMount() {
    this.initialMyStart()
  }

  componentDidUpdate() {
    if (this.props.updateBlog || this.state.deleted) {
      this.getData()
    }
    if (this.state.didMount) {
      this.getData()
    }
  }

  updateDelete() {
    this.setState({
      deleted: true
    })
  }


  initialMyStart = async () => {

    let res = await getComments(this.props.blog._id, this.props.blog.comments);
    if (res.data) {
      this.setState({
        comments: res.data,
        didMount: true
      })
      this.props.setBlog(this.props.blog)
    }
    return this.props.updateBloggs(false)
  }



  getData = async () => {
    let res1 = await this.props.setPublicBlogs()
    if (res1) {
      let newArr = this.props.publicBlogs.filter(item => item._id === this.props.currentBlog._id)[0]

      let res = await getComments(this.props.blog._id, newArr.comments);
      if (res.data) {
        this.setState({
          newCardList: res.data,
          didMount: false,
          deleted: false
        })
        return this.props.updateBloggs(false)
      }
      return this.props.updateBloggs(false)
    }

  }




  render() {
    const data = this.state.comments && this.state.comments.length ? this.state.comments.map((i, x) => {

      return <div style={styles.card} key={x}>
        <CommentCard
          updateDelete={(e) => this.updateDelete()}
          auth={this.props.authenticated}
          admin={this.props.admin}
          info={i._id}
          userId={this.props.blog.user}
          postedBy={i.postedBy}
          blogObj={this.props.blog}
          userobj={this.props.userData}
          loggedIn={this.props.auth}
          comment={i.content}
          name={this.props.userData.displayName}
          avatar={i.avatar}
          date={i.createdAt.slice(0, 10)}
        />
      </div>
    }) : <Spin />

    return this.state.didMount ? data :
      this.state.newCardList.map((i, x) => {
        return <div style={styles.card} key={x}><CommentCard
          updateDelete={(e) => this.updateDelete()}
          auth={this.props.isAuth}
          admin={this.props.admin}
          userobj={this.props.userData}
          comment={i.content}
          blogObj={this.props.blog}
          info={i._id}
          loggedIn={this.props.auth}
          userId={this.props.blog.user}
          postedBy={i.postedBy}
          date={i.createdAt.slice(0, 10)}
          name={this.props.userData.displayName}
          avatar={i.avatar}
        /></div>
      })
  }
}


const mapStateToProps = state => ({
  admin: state.userData.admin,
  userData: state.userData.userData,
  authenticated: state.userData.authenticated,
  publicBlogs: state.bloggerData.publicBlogs,
  myBlogs: state.bloggerData.myBlogs,
  updateBlog: state.bloggerData.updateBlog,
  currentBlog: state.bloggerData.currentBlog
});
const mapDispatchToProps = { setBlog, setMyBlog, updateBloggs, publicBloggs, setPublicBlogs };
export default connect(mapStateToProps, mapDispatchToProps)(CardBody)