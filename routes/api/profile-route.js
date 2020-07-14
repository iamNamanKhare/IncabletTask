const router = require('express').Router()
const UserModel = require('../../model/user-model')
const upload = require('../../utils/cloudinary-upload-util')

router.get('/', async (req, res) => {

    try{
        const list = await UserModel.find({})
        res.status(201).json({list});

    } catch(e) {
        res.status(501).json({messsage: e})
    }
})

router.post('/', upload.single('photo'), (req, res) => {    

    // console.log(req)
    try{
        const Profile = new UserModel({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            img: req.file.path,
            date: req.body.date,
            status: req.body.status
        });

        Profile.save().then((newProfile) => {
            res.status(201).json(newProfile);
        })
        .catch((err) => {
            console.log(err);
            res.status(503).json({ message: err });
        })
    }catch(e) {
        console.log(e);
        res.json({message: "Some Error Occurred"})
    }
});

module.exports = router