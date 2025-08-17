const {Router} = require('express')
const router = Router()
const {research} = require('../controller/ai.c.js')

router.post('/', research)
module.exports = router