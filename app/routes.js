module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/login', function(req, res) {
    res.render('auth', { page: req.path, message: req.flash('loginMessage') })
    // res.render('login', { message: req.flash('loginMessage') })
  });

  app.get('/signup', function(req, res) {
    res.render('auth', { page: req.path, message: req.flash('signupMessage') })
    // res.render('signup', { message: req.flash('signupMessage') })
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', { user: req.user });
  });

  app.get('/logout', function(req, res) {
    delete app.locals.username; // app.locals.username = profile.username;
    req.logout();
    res.redirect('/')
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}
