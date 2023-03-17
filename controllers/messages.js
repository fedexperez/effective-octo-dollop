const Message = require('../models/message');

const getChat = async(req, res) => {
    const myUid = req.uid;
    const messagesFromUserId = req.params.toUserId;
    
    const last30 = await Message.find({
        $or: [{fromUser: myUid, toUser: messagesFromUserId},{fromUser: messagesFromUserId, toUser: myUid}]
    })
    .sort({createdAt: 'desc' })
    .limit(30);
    
    res.json({
        ok: true,
        messages: last30,
    });
};

module.exports = {
    getChat
};