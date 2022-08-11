import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'
import { UserModel, User } from 'database/models/user.model';

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      UserModel.findOne({ email: req.body.email })
        .then((exists) => {
          if (exists) {
            throw Error('Email is already token');
          }
          const username = req.body.name;
          return UserModel.create({ username, email });
        })
        .then((user) => {
          if (!user) {
            throw Error('Failed to create user');
          }
          user.setPassword(password);
          return user.save();
        })
        .then((user) => {
          return done(null, user);
        })
        .catch(done);
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      // Strategy is based on username & password.  Substitute email for username.
      usernameField: 'email',
      passwordField: 'password',
    },

    (email, password, done) => {
      UserModel.findOne({ email })
        .then((user: User | null) => {
          if (!user) {
            throw Error('Invalid email or password');
          }
          if (!user.validPassword(password)) {
            throw Error('Invalid email or password');
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);
