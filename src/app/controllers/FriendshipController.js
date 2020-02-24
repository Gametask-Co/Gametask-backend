import * as Yup from 'yup';

import User from '../models/User';

function isValidMongoDbID(str) {
    const checkForValidMongoDbID = new RegExp('^[0-9a-fA-F]{24}$');
    return checkForValidMongoDbID.test(str);
}

function setFriend(f1, f2) {
    let f1_friend_list = f1.friend_list,
        f2_friend_list = f2.friend_list;

    f1_friend_list.push({ friend_id: f2._id });
    f2_friend_list.push({ friend_id: f1._id });

    return { f1: f1_friend_list, f2: f2_friend_list };
}

function checkFriendship(f1, f2) {
    let f1_flag = false,
        f2_flag = false;

    Object.keys(f1.friend_list).forEach(function(key) {
        if (f1.friend_list[key].friend_id == f2._id) f1_flag = true;
    });

    Object.keys(f2.friend_list).forEach(function(key) {
        if (f2.friend_list[key].friend_id == f1._id) f2_flag = true;
    });

    return f1_flag && f2_flag;
}

class FriendshipController {
    async store(req, res) {
        const schema = Yup.object().shape({
            id: Yup.string().required()
        });

        if (!(await schema.isValid(req.body)) || !isValidMongoDbID(req.body.id))
            return res.status(400).send({ message: 'Validation error' });

        const friend = await User.findById(req.body.id);

        if (!friend)
            return res.status(400).send({ message: 'Friend not found' });

        const user = await User.findById(req.userId);
        const { f1, f2 } = setFriend(user, friend);
        user.friend_list = f1;
        friend.friend_list = f2;

        await user.updateOne(user);
        await friend.updateOne(friend);

        return res.send({ message: 'Succefully operation' });
    }

    async index(req, res) {
        const user = await User.findById(req.userId);
        return res.send(user.friend_list);
    }

    async delete(req, res) {
        const schema = Yup.object().shape({
            id: Yup.string().required()
        });

        if (!(await schema.isValid(req.body)) || !isValidMongoDbID(req.body.id))
            return res.status(400).send({ message: 'Validation error' });

        const friend = await User.findById(req.body.id);

        if (!friend)
            return res.status(400).send({ message: 'Friend not found' });

        const user = await User.findById(req.userId);
        let { friend_list } = user;

        if (!checkFriendship(user, friend))
            return res.status(400).send({ message: 'Not friends' });

        friend_list = friend_list.filter(
            ({ friend_id }) => !friend_id.includes(friend._id)
        );
        user.friend_list = friend_list;

        let friend_list_friend = friend.friend_list;
        friend_list_friend = friend_list_friend.filter(
            ({ friend_id }) => !friend_id.includes(user.id)
        );
        friend.friend_list = friend_list_friend;

        await user.updateOne(user);
        await friend.updateOne(friend);

        return res.send({ message: 'Succefully operation' });
    }
}

export default new FriendshipController();
