import express from 'express';

class FriendshipController {
    async test(req, res) {
        res.send({ ok: true, user: req.userId });
    }
}

export default new FriendshipController();
