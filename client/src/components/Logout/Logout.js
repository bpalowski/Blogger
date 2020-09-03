import React from 'react'
import { connect } from 'react-redux'
import { setLogut } from '../../state/auth/index'


function Logout({ setLogut }) {
  console.log("hello")
  // return axios.get('http://localhost:5000/auth/logout')
  //   .then(res => {
  //     setLogut()
  //   }).catch(err => {
  //     console.log(err)
  //   })
}

export default Logout

const mapStateToProps = state => ({
  authenticated: state.userData.authenticated,
});
const mapDispatchToProps = { setLogut };
export default connect(mapStateToProps, mapDispatchToProps)(Logout)