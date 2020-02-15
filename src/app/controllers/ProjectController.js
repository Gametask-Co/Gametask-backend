import express from 'express';

// exemplo somente para utilizar middle de autenticacao na API
class ProjectController {
    async test(req, res) {
        res.send({ ok: true, user: req.userId });
    }
}

export default new ProjectController();
