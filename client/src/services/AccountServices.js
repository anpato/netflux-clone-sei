import ApiClient from './ApiClient'

export const GetProfiles = async (accountId) => {
  try {
    const res = await ApiClient.get(`/profiles/${accountId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetAvatars = async () => {
  try {
    const res = await ApiClient.get('/avatars')
    return res.data
  } catch (error) {}
}

export const CreateProfiles = async (accountId, profileData) => {
  try {
    const res = await ApiClient.post(
      `/profiles?account=${accountId}`,
      profileData
    )
    return res.data
  } catch (error) {
    console.log(error)
  }
}
