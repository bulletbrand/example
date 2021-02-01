const Router = require('express')
const User = require('../models/User')
const passport = require('passport')
const router = new Router()

router.get(
    '/list', async (req, res, next) => {
        const users = await User.findAll({attributes:{exclude:['password']}})
        return res.status(200).json(users)
    });

router.post('/save', async (req, res, next) => {
        try{
            let object = await req.body
            let result = {}
        if(object.hasOwnProperty("id")){
            result = await User.update(object, {where:{id:object.id}})
        }else{
            result = await User.create(object)
        }
        next("Body: " + JSON.stringify(result))
        res.json(result)
        }catch(e){
            console.error(e)
            res.error
        }
    });
    
router.delete('/delete/:id', async (req, res,next) => {
    
        User.forge({id:req.params.id}).destroy()
                .then(msg =>{
                    res.status(200).json({message: "OK"})
                })
                .catch(error =>{
                    next(error)
                    res.status(500).json({message: "Delete Failed"})
                })
    
    })

module.exports = router