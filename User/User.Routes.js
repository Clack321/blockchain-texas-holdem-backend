const router = require('express').Router(); 
const service = require('./User.Service');
const { validateAuthToken } = require('../middleware/auth');

router.get("/", validateAuthToken, async (req, res)=>{
    service.find(req.query).then(data => {
        res.status(200).send(data)
    })
})
router.get("/:id", validateAuthToken, async (req, res)=>{
    service.findOne(req.params.id).then(data => {
        res.status(200).send(data)
    })
})

router.post("/", async (req, res)=>{
    service.register(req.body, res).then(data => {
        res.status(200).send(data)
    })
})

router.post("/login", async (req, res)=>{
    service.login(req.body, res).then(data => {
        res.status(200).send(data)
    })
})

module.exports = router;
