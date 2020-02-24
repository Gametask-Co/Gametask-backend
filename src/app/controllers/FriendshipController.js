import * as Yup from 'yup';

import User from '../models/User';

class FriendshipController {
    async store(req, res) {
        const schema = Yup.object().shape({
            id: Yup.string().required()
        });

        let checkForValidMongoDbID = new RegExp('^[0-9a-fA-F]{24}$');

        if (
            !(await schema.isValid(req.body)) ||
            !checkForValidMongoDbID.test(req.body.id)
        )
            return res.status(400).send({ message: 'Validation error' });

        const friend = await User.findById(req.body.id);

        if (!friend)
            return res.status(400).send({ message: 'Friend not found' });

        const user = await User.findById(req.userId);
        const { friend_list } = user;

        friend_list.push({
            friend_id: friend._id
        });
        user.friend_list = friend_list;

        const friend_list_friend = friend.friend_list;
        friend_list_friend.push({
            friend_id: user._id
        });
        friend.friend_list = friend_list_friend;

        await user.updateOne(user);
        await friend.updateOne(friend);

        return res.send({ message: 'Succefully operation' });
    }

    async delete(req, res) {
        const schema = Yup.object().shape({
            id: Yup.string().required()
        });

        let checkForValidMongoDbID = new RegExp('^[0-9a-fA-F]{24}$');

        if (
            !(await schema.isValid(req.body)) ||
            !checkForValidMongoDbID.test(req.body.id)
        )
            return res.status(400).send({ message: 'Validation error' });

        const friend = await User.findById(req.body.id);

        if (!friend)
            return res.status(400).send({ message: 'Friend not found' });

        const user = await User.findById(req.userId);
        let { friend_list } = user;

        let friend_flag = false;

        Object.keys(friend_list).forEach(function(key) {
            if (friend_list[key].friend_id == friend._id) friend_flag = true;
        });

        if (!friend_flag)
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
