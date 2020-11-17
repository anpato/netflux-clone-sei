const { User, Account, Profile } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const GetUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch (error) {
    throw error
  }
}

const VerifyUserSession = (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, 'MY_SECRET', (err, t) => {
    if (err) {
      return res.status(401).json({ msg: 'Unauthorized' })
    }
    return res.send(t)
  })
}

const LoginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      include: [{ model: Account, include: [Profile] }]
    })
    if (
      user &&
      (await bcrypt.compare(req.body.password, user.dataValues.password_digest))
    ) {
      const payload = {
        id: user.id,
        accountId: user.dataValues.Account.id
      }
      const token = jwt.sign(payload, 'MY_SECRET')
      return res.send({ account: user.dataValues.Account, payload, token })
    }
    return res.status(401).json({ msg: 'Account Not Found' })
  } catch (error) {
    throw error
  }
}

const RegisterUser = async (req, res) => {
  try {
    const password_digest = await bcrypt.hash(req.body.userInfo.password, 12)
    const user = await User.create({
      ...req.body.userInfo,
      password_digest: password_digest
    })
    const account = await Account.create({
      tier: req.body.account.tier,
      userId: user.dataValues.id
    })

    res.send({ user, account })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetUsers,
  RegisterUser,
  LoginUser,
  VerifyUserSession
}
