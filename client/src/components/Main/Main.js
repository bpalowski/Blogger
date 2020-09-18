import React, { PureComponent, } from 'react'

import { Layout, Spin, Card, Col, Row, Divider, Typography, Form, Button } from 'antd';
import { YoutubeFilled, GithubFilled, LinkedinFilled, TwitterSquareFilled, PhoneFilled } from '@ant-design/icons';
import { connect } from 'react-redux'
import { setUserData } from '../../state/actions/auth'

import { setPublicBlogs, setBlog } from '../.././state/actions/blogger'
import BlogBody from '../Blog/BlogBody';

import Nav from '../Nav/Nav'
import me from '../../img/paul.jpeg'
import SearchBar from '../SearchBar/SearchBar'
const { Title, Link, Paragraph, Text } = Typography
const { Header, Footer, Content } = Layout;






const styles = {
  rootContainer: {
    boxShadow: "0px 1px 15px 0px #676767",

    height: "90vh",
    margin: " 20px  50px 50px 50px",
  },
  blogBody: {
    overflow: "hidden",
    overflowY: "auto",
    overflowX: "auto",
    height: '55vh',
    boxShadow: "0px 1px 15px 0px #676767",
    marginBottom: "10px",
  },
  contentStyle: {
    padding: "2%",
    backgroundColor: "white"
  },
  card: {
    textAlign: "center",
    width: "300px",
    height: "55vh",
    // border: "2px solid #484848",
    boxShadow: "0px 1px 15px 0px #676767",

    padding: "30px"
  },
  row1: {
    marginTop: "10px"
  },
  rowInnerCard: {
    marginTop: "50px"
  },
  formFilter: {

  },
  colfilter: {
  },
  header: {
  },
  info: {
    height: "50vh",
    backgroundColor: "white"
  },
  footStyle: {
    overflow: "hidden",
    height: "15vh",
    padding: "2%",
    // marginTop: "60px",

    textAlign: 'center',
    backgroundColor: '#F8F8F8'
  },
  spin: {
    marginTop: "40vh"
  },
  youtube: {
    color: "#c4302b",
    fontSize: "25px",
    width: "1px",
    height: "5px"
  },
  linkedin: {
    color: "#2867B2",
    fontSize: "25px",
    width: "1px",
    height: "5px"
  },
  github: {
    color: "#24292e",
    fontSize: "25px",
    width: "1px",
    height: "5px"
  },
  twitter: {

    color: "#1DA1F2",
    fontSize: "25px",
    width: "1px",
    height: "5px"
  }
};

class Main extends PureComponent {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      select: [],
      finalList: []
    }
  }

  componentDidMount() {
    this.props.setPublicBlogs()
    if (!this.props.authenticated) {
      this.props.setUserData()
    }
  }

  filters = () => {
    let arr = this.state.select;
    let arrObj = this.props.publicBlogs;
    let newArr = arrObj.map((x, i) => {
      return arr.includes(x.catagory) ? x : -1
    }).filter(r => r !== -1)

    let res = Promise.all(newArr)
      .then(response => {
        return response
      })
    return res
  }

  getOptions = (data) => {
    let val = data;
    this.setState({
      select: val
    })
  }

  submitForm = async () => {
    let res = await this.filters()
    if (res) {
      this.setState({
        finalList: res,
      })

    }
  }



  publicView() {
    return <div><Nav />

      <Layout id="layoutcontainer" style={styles.rootContainer}>


        <Form id="formFilters" style={styles.formFilter} ref={this.formRef} onFinish={this.onFinish}>

          <Header style={styles.header}>
            <Row style={styles.formFilter} justify="start">
              <Col style={styles.colfilter}>
                <Form.Item style={styles.colfilter} name="catagory">
                  <SearchBar getOptionList={this.getOptions} />
                </Form.Item>
              </Col>
              <Col>
                <Button onClick={(e) => this.submitForm()} type="primary">Filter</Button>
              </Col>
            </Row>
          </Header>

        </Form>



        <Layout >

          <Content style={styles.contentStyle}>
            <Row id="row-cards" style={styles.row1} justify="space-between">


              <Col style={styles.blogBody}>

                {this.props.publicBlogs.length === 0 ? <Title style={{ textAlign: "center" }} type="secondary"><Spin size="large" /></Title> : <BlogBody listFilter={this.state.finalList} />}
              </Col>
              <Col
                id="card-info"
                style={styles.info}>
                <Card

                  style={styles.card}
                  cover={<img style={{ borderRadius: "5%" }} alt="example" src={me} />}>
                  <Divider />

                  <Title level={4}>Paul Franco</Title>
                  <Paragraph>Mobile Application Developer</Paragraph>
                  <Row style={styles.rowInnerCard} justify="space-around" align="bottom">
                    <Col>
                      <Link href="https://www.youtube.com/channel/UCqt7hqVTOLrehKTHIpu99qw" target="_blank">
                        <YoutubeFilled style={styles.youtube} />
                      </Link>
                    </Col>
                    <Col>
                      <Link href="https://twitter.com/codefranco" target="_blank">
                        <TwitterSquareFilled style={styles.twitter} />
                      </Link>
                    </Col>
                    <Col>
                      <Link href="https://www.linkedin.com/in/codefranco/">
                        <LinkedinFilled style={styles.linkedin} />
                      </Link>
                    </Col>
                    <Col>
                      <Link href="https://github.com/paulfranco">
                        <GithubFilled style={styles.github} />
                      </Link>
                    </Col>
                  </Row>

                </Card>
              </Col>

            </Row>
          </Content>

        </Layout>

        <Footer style={styles.footStyle}>
          <Row justify="end">
            <Col>
              <Title level={5}>Contact</Title>
              {/* <Divider /> */}
              <Paragraph><Text type="success"><PhoneFilled />206-565-8283</Text></Paragraph>

              <Paragraph><Link href="http://www.paulfran.co/">http://www.paulfran.co/</Link></Paragraph>
            </Col>

          </Row>

        </Footer>
      </Layout >

    </div >
  }

  render() {

    return !this.props.publicBlogs ? <Spin style={styles.spin} size="large" /> : this.publicView()


  }
}
const mapStateToProps = state => ({
  publicBlogs: state.bloggerData.publicBlogs,
  myBlogs: state.bloggerData.myBlogs,
  currentBlog: state.bloggerData.currentBlog,
  userData: state.userData.userData,
  authenticated: state.userData.authenticated,
});
const mapDispatchToProps = { setUserData, setPublicBlogs, setBlog };
export default connect(mapStateToProps, mapDispatchToProps)(Main)