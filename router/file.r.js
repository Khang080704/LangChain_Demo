const {Router} = require('express')
const router = Router()
const {writeToFile} = require('../controller/ai.c')

router.post('/', writeToFile)
module.exports = router