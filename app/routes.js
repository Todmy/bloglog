var Article = require('./models/article');
var extend = require('util')._extend;


module.exports = function(app, passport) {

  app.use(function(req, res, next) {
    app.locals.user = req.user;
    app.locals.page = req.path;
    next();
  });

  app.all('/article/*', isLoggedIn);

  app.get('/', function(req, res) {
    var page = req.query.page || 1;
    
    Article.paginate({}, {
      page: page,
      limit: 5,
      sortBy: {
        date: -1
      }
    }, function(err, articles, pagesAmount, articlesAmount) {
      if (err){
        throw err;
      }

      res.render('index', {
        articles: articles,
        pagination: {
          currentPage: page,
          pagesAmount: pagesAmount,
          articlesAmount: articlesAmount
        }});
    });
    // Article.find({}, )
  });

  app.get('/login', isAuthorized, function(req, res) {
    res.render('auth', { message: req.flash('loginMessage') })
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))

  app.get('/signup', isAuthorized, function(req, res) {
    res.render('auth', { message: req.flash('signupMessage') })
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/')
  });

  app.get('/about', function(req, res) {
    res.render('about');
  });

  app.get('/article/new', function(req, res) {
    res.render('new-article');
  })

  app.post('/article/new', function(req, res) {
    var articleParams = extend({author: req.user.username}, req.body)
    var newArticle = new Article(articleParams)
    newArticle.save(function(err) {
      if (err){
        throw err;
      }
    })
    res.redirect('/');
  })

  app.get('/article/:id', function(req, res) {
    Article.findById(req.params.id, function(err, article) {
      if (err){
        throw err;
      }

      res.render('article', { article: article })
    })
  })

  app.put('/article/:id', function(req, res) {
    Article.findByIdAndUpdate(req.params.id, { $set: req.body}, function(err) {
      if (err){
        throw err;
      }

      res.status(200).send('Article updated');
    })
  })

  app.delete('/article/:id', function(req, res) {
    Article.findByIdAndRemove(req.params.id, function(err) {
      if (err){
        throw err;
      }

      res.status(200).send('Article removed');
    })
  })

  app.post('/article/:id/comment', function(req, res) {
    Article.findById(req.params.id, function(err, article) {
      if (err){
        throw err;
      }
      article.comments.unshift(req.body);

      article.save(function(err) {
        if (err){
          throw err;
        }
      })
    })

    res.redirect('/article/' + req.params.id);
  })
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

function isAuthorized(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}
