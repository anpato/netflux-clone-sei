import ApiClient from './ApiClient'

export const RegisterUser = async (formData, accountInfo) => {
  try {
    const res = await ApiClient.post('/users/register', {
      userInfo: formData,
      account: { tier: accountInfo }
    })
    return res
  } catch (error) {
    throw error
  }
}

export const SignIn = async (formData) => {
  try {
    const res = await ApiClient.post('/users/login', formData)
    localStorage.setItem('token', res.data.token)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    const res = await ApiClient.get('/users/session')
    return { status: res.status, data: res.data }
  } catch (error) {
    throw error
  }
}
