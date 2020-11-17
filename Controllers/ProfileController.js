const { Profile, Account } = require('../models')

const CreateProfile = async (req, res) => {
  try {
    const profile = await Profile.create({
      ...req.body,
      accountId: parseInt(req.query.account)
    })
    res.send(profile)
  } catch (error) {
    throw error
  }
}

const GetProfile = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.account_id, {
      include: [Profile]
    })
    res.send(account)
  } catch (error) {
    throw error
  }
}

module.exports = {
  CreateProfile,
  GetProfile
}
