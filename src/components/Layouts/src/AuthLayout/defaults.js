import logo from '@assets/logo.png'
import UI_CONTENT from '@constants/ui.content.default'

/**
 * Defaults - Default attributes for the Auth view
 *
 * @return {Object} An object containing props and methods
 */
export default () => {

  const authFormTitle = AuthFormTitle
  const authFooter = AuthFooter
  const authMainContent = AuthContent

  const usernameRules = [
    v => !!v || UI_CONTENT.AUTH_ALERT_EMAIL_REQUIRED,
    v =>  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v) || UI_CONTENT.AUTH_ALERT_INVALID_EMAIL,
  ]
  const passwordRules = [
    v => !!v || UI_CONTENT.AUTH_ALERT_PASSWORD_REQUIRED,
  ]

  return {
    props: {
      authFormTitle,
      authFooter,
      authMainContent,
      usernameRules,
      passwordRules
    }
  }
}

const AuthFormTitle = {
  name: 'AuthFormTitle',
  // eslint-disable-next-line
  render: function(h) {
    return (
      <div style={styles.authFormContainer}>
        <p style={styles.authFormTitle}>
          {UI_CONTENT.AUTH_CONTAINER_TITLE}
        </p>
      </div>
    )
  }
}

const AuthContent = {
  name: 'AuthContent',
  // eslint-disable-next-line
  render: function(h) {
    return (
      <div>
        <img style={styles.vaImg} src={logo} />
        <h3>Welcome to Vue-Admin</h3>
      </div>
    )
  }
}

const AuthFooter = {
  name: 'AuthFooter',
  // eslint-disable-next-line
  render: function(h) {
    return null
  }
}

const styles = {
  authFormContainer: {
    margin: '10px'
  },
  authFormTitle: {
    fontWeight: '300'
  },
  vaImg: {
    margin: 'auto',
    width: '140px'
  }
}
