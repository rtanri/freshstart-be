const { validationResult, check } = require('express-validator')

exports.resultsValidator = (req) => {
  const messages = []
  if (!validationResult(req).isEmpty()) {
    const errors = validationResult(req).array()
    for (const i of errors) {
      messages.push(i)
    }
  }
  return messages
}

exports.registerValidator = () => {
  return [
    check('firstName')
        .notEmpty(),
    check('lastName')
        .notEmpty(),
    check('username')
      .notEmpty()
      .withMessage('username is required')
      .not()
      .custom((val) => /[^A-za-z0-9\s]/g.test(val))
      .withMessage('Username must not have unique charcters'),

    check('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ min: 8 })
      .withMessage('password must be 8 characters'),

    check('confirmPassword')
      .trim()
      .isLength({min:8 , max:16})
      .withMessage('Password must be between 8 to 16 characters')
      .custom((confirmPassword,{req})=> {
        console.log(confirmPassword)
          const password = req.body.password
          if (password != confirmPassword) {
              throw new Error ('Passwords must be same')
          } else {
            return true
          }
      })
  ]
}

exports.loginValidator = () => {
  return [
    check('username').notEmpty().withMessage('username or email is required'),
    check('password').notEmpty().withMessage('password is required')
  ]
}