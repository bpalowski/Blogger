import React, { Component } from 'react';
import { connect } from 'react-redux'

import PrivateRoute from './components/Auth/index'

import { Route, Switch } from 'react-router-dom';
import Main from './components/Main/Main'
import Login from './components/Login/Login'
import User from './components/User/User'

import BlogForm from './components/Blog/BlogForm'
import BlogEditForm from './components/Blog/BlogEditForm'
import Blog from './components/Blog/Blog'

import Error from './components/Error/Error'
import './App.css';


class App extends Component {

  render() {
    return (
      <div className="App" >

        <Switch>
          <Route
            exact
            path="/"
            component={Main}
          />
          <Route
            exact
            path="/login"
            component={Login}
          />
          <Route
            path="/blog"
            component={Blog}
          />
          <PrivateRoute
            exact
            authed={this.props.authenticated}
            path="/user"
            component={User}
          />
          <PrivateRoute
            exact
            authed={this.props.authenticated}
            path="/createblog"
            component={BlogForm}
          />
          <PrivateRoute
            exact
            authed={this.props.authenticated}
            path="/editblog"
            component={BlogEditForm}
          />
          <Route
            component={Error}
          />
        </Switch>

      </div>
    );
  }

}

const mapStateToProps = state => ({
  authenticated: state.userData.authenticated,
  bloggerData: state.bloggerData.publicBlogs
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(App)
