module.exports = function(app, passport) {

  app.all('*', function(req, res, next) {
    app.locals.user = req.user;
    app.locals.page = req.path;
    next();
  });

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/login', function(req, res) {
    res.render('auth', { message: req.flash('loginMessage') })
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))

  app.get('/signup', function(req, res) {
    res.render('auth', { message: req.flash('signupMessage') })
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', { user: req.user });
  });

  app.get('/logout', function(req, res) {
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
