var User = require('../modules/UsersSchema');

const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
    const Email = req.body.Email;
    const Password = req.body.Password;
    let loadedUser;

    try {

        var user = await User.findOne({ Email: Email.toString().trim() }); 

        // console.log("user", Email, Password ,user)

        if (!user) {

            if(Email == 'admin@gmail.com' && Password == '12345') {
                const adminObj = {
                    Name: 'Admin',
                    Email: Email,
                    Password: Password,
                    Gender: 'Male',
                    Address: 'Address',
                    Role: 'VE',
                }
                const userN = new User(adminObj);

                // console.log("user", user, adminObj);
                // adminObj._id = user._id;
                user = userN;
            
                var result = await user.save()
            } else {
                res.status(200).json({ Message: 'A user with this email(' + Email + ') could not be found.', Result: false });
            }

        }
        loadedUser = user;

        var isEqual = Password == user.Password;

        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 200;
            res.status(200).json({ Message: "'Wrong password!'", Result: false });
            throw error;
        };

        const token = jwt.sign(
            {
                Email: loadedUser.Email,
                UserId: loadedUser._id.toString(),
                Role: loadedUser.Role.toString(),
            },
            'somesupersecretsecret',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token: token,  
            Result: true,
            Message: 'Login Successful',
            data: loadedUser
        });

    } catch (error) {
        res.status(201).json({ Message: error.message, response: error, Result: false });

    }
};

exports.getLiveUser = async (req, res, next) => {

    try {
        var liveUser = require('./socket').getNoOfUserConnected();
        res.status(200).json({ liveUser: liveUser });
    } catch (error) {
        res.status(201).json({ Message: error.message, response: error, Result: false });

    }
};

exports.getMyProfile = async (req, res) => {
    try {
        var user = await User.find({ _id: req.query.userId });
        res.send({ User: user });
    } catch (error) {
        res.status(201).json({ Message: error.message, response: error, Result: false });
    }
}

exports.addUser = async (req, res) => {
    console.log("req.body", req.body);

    const body = req.body;

    const user = new User({
        Name: body.Name,
        Email: body.Email,
        Password: body.Password,
        Gender: body.Gender,
        Address: body.Address,
        Role: body.Role,
    });

    var result = await user.save()
    res.status(200).json({ Message: 'User created!', Result: true });

}

exports.updateUsers = async (req, res) => {
    // console.log("req.body", req.body);
    // console.log("req.params", req.params);

    const body = req.body;

    const par = {
        Name: body.Name,
        Email: body.Email,
        Password: body.Password,
        Gender: body.Gender,
        Address: body.Address,
        Role: body.Role,
    };

    var result = await User.updateOne({ _id: req.params.id }, par)
    res.status(200).json({ Message: 'User Update!', Result: true });

}

exports.getUser = async (req, res) => {
    try {
        var user = await User.find();
        res.send({ User: user });
    } catch (error) {
        res.status(201).json({ Message: error.message, response: error, Result: false });
    }
}

exports.usersById = async (req, res) => {
    try {
        var user = await User.find({ _id: req.query.id });
        res.send({ User: user });
    } catch (error) {
        res.status(201).json({ Message: error.message, response: error, Result: false });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        var result = await User.deleteOne({ _id: req.query.id }, { isDeleted: 1 });
        console.log("result", req.query, result);

        if (result.acknowledged && result.deletedCount > 0) {
            res.status(200).json({ Message: 'Delete User!', response: result, Result: true });
        } else {
            res.status(201).json({ Message: 'Not Delete User !', response: result, Result: false });
        }
    } catch (error) {
        res.status(201).json({ Message: error.message, response: error, Result: false });
    }
}
 

 

