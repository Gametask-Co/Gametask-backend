import * as Yup from 'yup';

import User from '../models/User';

class FriendshipController {
    async store(req, res) {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required()
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).send({ message: 'Validation error' });

        const friend = await User.findById(req.body.id);
        let checkForValidMongoDbID = new RegExp('^[0-9a-fA-F]{24}$');

        if (!friend || !checkForValidMongoDbID.test(req.body.id))
            return res.status(400).send({ message: 'Friend not found' });

        const user = await User.findById(req.userId);
        const { friend_list } = user;

        friend_list.push({
            friend_id: friend._id,
            name: friend.name,
            email: friend.email
        });
        user.friend_list = friend_list;

        const friend_list_friend = friend.friend_list;
        friend_list_friend.push({
            friend_id: user._id,
            name: user.name,
            email: user.email
        });
        friend.friend_list = friend_list_friend;

        await user.updateOne(user);
        await friend.updateOne(friend);

        return res.send({ message: 'Succefully operation' });
    }
}

export default new FriendshipController();
