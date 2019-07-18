import React, { Component } from 'react'
import SocialLogin from 'react-social-login'
import PropTypes from 'prop-types'

class Button extends Component {
  static propTypes = {
    triggerLogin: PropTypes.func.isRequired,
    triggerLogout: PropTypes.func.isRequired
  }

  render () {
    const { children, triggerLogin, triggerLogout, ...props } = this.props
    const style = {
      display: 'inline-block',
    }

    return (
      <div onClick={triggerLogin} style={style} {...props}>
        { children }
      </div>
    )
  }
}

export default SocialLogin(Button)