const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('./config/key');
const { User } = require('./models/User');
const app = express();

app.set('port', 4000);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
dotenv.config();

mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connecting error : ' + err));

app.post('/api/users/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "존재하지 않는 계정입니다."
            });
        }else{
            user.comparePassword(res.body.password, (err, isMatch) => {
                if(!isMatch){
                    return res.json({
                        loginSuccess: false,
                        message: "아이디 혹은 비밀번호가 맞지 않습니다."
                    });
                }
            });
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({loginSuccess: true, userId: user._id});
            });
        }
    });
});

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200, json({
        _id: req.user._id
    }));
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 실행 중...`);
});