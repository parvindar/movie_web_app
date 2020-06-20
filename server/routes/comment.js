const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

const { auth } = require("../middleware/auth");

//=================================
//             Comments
//=================================

router.post('/submitComment',auth,(req,res)=>{
    const comment = new Comment(req.body);
    comment.save((err,comment)=>{
        if(err) return res.json({success:false,err});

        Comment.find({'_id':comment._id})
        .populate('writer')
        .exec((err,result)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).json({success:true,result});
        })
        
    })
})

router.post('/getComments',auth,(req,res)=>{
    console.log('getComments',req.body)
    Comment.find({"movieId":req.body.movieId})
    .populate('writer')
    .exec((err,result)=>{
        if(err) return res.json({success:false,err});
        return res.status(200).json({success:true,result});
    })
})


module.exports = router;
