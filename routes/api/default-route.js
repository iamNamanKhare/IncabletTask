const router = require('express').Router()
const axios = require('axios')

router.get('/', (req, res) => {
    axios.get('https://5w05g4ddb1.execute-api.ap-south-1.amazonaws.com/dev/profile/listAll').then((result) => {
        res.json(result.data)
    })
    .catch((err) => {
        console.log(err);
        res.json({message: "some error Occurred"})
    })
})

module.exports = router