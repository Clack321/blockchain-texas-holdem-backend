const router = require('express').Router(); 
const service = require('./Action.Service');
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

router.post("/", validateAuthToken, async (req, res)=>{
    service.create(req.body, res).then(data => {
        res.status(200).send(data)
    })
})

router.patch("/:id", validateAuthToken, async (req, res)=>{
    service.update(req.params.id, req.body, res).then(data => {
        res.status(200).send(data)
    })
})

router.delete("/:id", validateAuthToken, async (req, res)=>{
    service.delete(req.params.id, res).then(data => {
        res.status(200).send(data)
    })
})

module.exports = router;