import defaults from '@components/Layouts/src/AuthLayout/defaults'

export default state => {
  const { username: userCredential, password: passwordCredential } = state

  return {
    props: {
      authFormTitle: defaults().props.authFormTitle,
      authFooter: defaults().props.authFooter,
      authMainContent: defaults().props.authMainContent,
      usernameRules: defaults().props.usernameRules,
      passwordRules: defaults().props.passwordRules,
      va: {
        login: (username, password) => {
          return username === userCredential && password === passwordCredential
            ? { then: () => {} }
            : new Promise(resolve => {
                resolve({
                  response: {
                    status: 401,
                  },
                })
              })
        },
      },
    },
  }
}
