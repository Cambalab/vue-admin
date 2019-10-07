import defaults from '@components/Layouts/src/AuthLayout/defaults'

export default {
  props: {
    authFormTitle: defaults().props.authFormTitle,
    authFooter: defaults().props.authFooter,
    authMainContent: defaults().props.authMainContent,
    usernameRules: defaults().props.usernameRules,
    passwordRules: defaults().props.passwordRules,
    va: {
      login: () => {},
    },
  },
}
