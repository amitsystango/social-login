import React from 'react';
import './App.css';
import SocialButton from './SocialButton'
import { FacebookLoginButton, GoogleLoginButton, InstagramLoginButton, LinkedInLoginButton } from "react-social-login-buttons";
import UserCard from './userCard'
import { LinkedIn, LinkedInPopUp } from 'react-linkedin-login-oauth2';
import QueryString from 'query-string';



class App extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      logged: false,
      user: {},
      currentProvider: ''
    }
    this.nodes = {}

    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLoginFailure = this.onLoginFailure.bind(this)
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this)
    this.onLogoutFailure = this.onLogoutFailure.bind(this)
    this.logout = this.logout.bind(this)
  }

  setNodeRef (provider, node) {
    if (node) {
      this.nodes[ provider ] = node
    }
  }

  onLoginSuccess (user) {
    console.log('user',user,this.state)

    this.setState({
      logged: true,
      currentProvider: user._provider,
      user
    })
  }

  onLinkedInLoginSuccess (user) {
    this.setState({
      logged: true,
      currentProvider: 'linkedin',
      user
    })
  }

  onLoginFailure (err) {
    console.error(err)

    this.setState({
      logged: false,
      currentProvider: '',
      user: {}
    })
  }

  onLogoutSuccess () {
    this.setState({
      logged: false,
      currentProvider: '',
      user: {}
    })
  }

  onLogoutFailure (err) {
    //console.log('err',err);
    console.error(err)
  }

  logout () {
    const { logged, currentProvider } = this.state

    if (logged && currentProvider) {
      this.nodes[currentProvider].props.triggerLogout()
    }
  }

  render() {

    const params = QueryString.parse(window.location.search);
    if (params.code || params.error) {
      return (
        <LinkedInPopUp />
      );
    }

    let view;

    if (this.state.logged) {
      view = <UserCard user={this.state.user} logout={this.logout} />
    } else {
      view = (
    <div className="App">
    <SocialButton
          provider='facebook'
          appId='883668888674092'
          onLoginSuccess={this.onLoginSuccess}
          onLoginFailure={this.onLoginFailure}
          onLogoutSuccess={this.onLogoutSuccess}
          getInstance={this.setNodeRef.bind(this, 'facebook')}
          key={'facebook'}
        >
      <FacebookLoginButton />
    </SocialButton>
    <br />
    <SocialButton
          provider='google'
          appId='729700452870-30jvp27c3c7fdvga0fct2i1qp59suq0t.apps.googleusercontent.com'
          onLoginSuccess={this.onLoginSuccess}
          onLoginFailure={this.onLoginFailure}
          onLogoutSuccess={this.onLogoutSuccess}
          onLogoutFailure={this.onLogoutFailure}
          getInstance={this.setNodeRef.bind(this, 'google')}
          key={'google'}
        >
      <GoogleLoginButton />
    </SocialButton>
    <br />
    <SocialButton
          autoCleanUri
          provider='instagram'
          appId='964da2b840e4430193c0a85d5be4d85b'
          redirect='http://localhost:3001'
          onLoginSuccess={this.onLoginSuccess}
          onLoginFailure={this.onLoginFailure}
          onLogoutSuccess={this.onLogoutSuccess}
          getInstance={this.setNodeRef.bind(this, 'instagram')}
          key={'instagram'}
        >
        <InstagramLoginButton />
      </SocialButton>
    <br />
      <LinkedIn
          clientId="78una9hzbxf6yb"
          onFailure={this.onLoginFailure}
          onSuccess={this.onLinkedInLoginSuccess}
          redirectUri="http://localhost:3001/"
          scope="r_liteprofile r_emailaddress w_member_social"
        >
      </LinkedIn>
      {/*https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/consumer/context

        https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=AQRfjQcCHL4WgFRTZWz9cqqFoB4owQzvNS20Xo23YW6yoZ2hBKB2cr1f4aKcLE-fZ12CVahTcgSz93QsomfjJX4rtZn9gRHQLqDoJ_XmNKMrE8qoOjzHIb9P0Bpd4FFa-OmALdgerANBWr9Jg1qPMbQxT8LSIa6VqHp1Qs-mDuasC0d-a6OtYbe6ZK-qNA&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2F&client_id=78una9hzbxf6yb&client_secret=Ls8J0zaHQWW3DFV5

        https://api.linkedin.com/v2/me?oauth2_access_token=AQXTzycrgG9UAeqKXyWHIbpn3NnyxBqXqm0dGqPbo8VYgn3JQgKG3gNT_OcNv1oIL60QIw3vOZRlDz7YfCJE1m6Utvr2sFjQaEN_XlrwA5hp7HxcX9xi5nCSkS1MZIKglaOWvnXnoyHVlO3d6Uf7CmoTUCxCLiVDgU4noRpfj_y4IcfwbfJWzlBZKVGi2ovuoqanC7ZjxPoJiq3IWGR8bB47qaQavRujBiCqS60XRkk1lbWcoLKyJ2xfSXdvjRd9jmC0-kfb1f_ZsDDALusdh0YfbgPL8TayXeQipbhFBHFbrpnSjj50U3Qj-MIhwy51WcgpTrO72s57_6fj2S9vH-mt0O8WuA


      <SocialButton
          provider='linkedin'
          appId='78una9hzbxf6yb'
          onLoginSuccess={this.onLoginSuccess}
          onLoginFailure={this.onLoginFailure}
          onLogoutSuccess={this.onLogoutSuccess}
          getInstance={this.setNodeRef.bind(this, 'linkedin')}
          key={'linkedin'}
        >
          <LinkedInLoginButton />
      </SocialButton>
      <SocialButton
                provider='amazon'
                appId='amzn1.application-oa2-client.26aaf63624854cbcaa084735a0fc47ed'
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
                onLogoutSuccess={handleSocialLogout}
                onLogoutFailure={handleSocialLogoutFailure}
                key={'amazon'}
              >
                <AmazonLoginButton />
              </SocialButton>
        <SocialButton
          autoCleanUri
          provider='github'
          gatekeeper='http://localhost:9999'
          appId='8a7c2edb2e602d969839'
          redirect='http://localhost:8080'
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
          onLogoutSuccess={handleSocialLogout}
          onLogoutFailure={handleSocialLogoutFailure}
          key={'github'}
        >
          <GithubLoginButton />
        </SocialButton>*/}
    </div>
  );
    }

  return view;
}
}

export default App;
