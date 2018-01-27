var Author = require('../models/author');

// Display list of all Authors
exports.author_list = function(req, res, next) {
  Author.find()
    .sort([['family_name', 'ascending']])
    .exec(function (err, list_authors) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('author_list', { title: 'Author List', author_list: list_authors });
    });
};

// Display detail page for a specific Author
exports.author_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
};

// Display Author create form on GET
exports.author_create_get = function(req, res) {
  res.render('author_form', { title: 'Create Author'});
};


// Handle Author create on POST
exports.author_create_post = function(req, res, next) {
  req.checkBody('first_name', 'First name must be specified.').notEmpty();
  req.checkBody('family_name', 'Family name must be specified').notEmpty();
  req.checkBody('family_name', 'Family name must be alphanumeric text.').isAlpha();
  // validate optional fields
  req.checkBody('date_of_birth', 'Invalid date').optional({checkFalsy: true})//.isDate();
  req.checkBody('date_of_death', 'Invalid date').optional({checkFalsy: true})

  req.sanitize('first_name').escape();
  req.sanitize('family_name').escape();
  req.sanitize('first_name').trim();
  req.sanitize('family_name').trim();
  req.sanitize('date_of_birth').toDate();
  req.sanitize('date_of_death').toDate();

  var errors = req.validationErrors();

  //Unlike with the Genre post handler, we don't check whether the Author object
  //already exists before saving it. Arguably we should, though as it is now we can have multiple authors with the same name.
  var author = new Author(
    { first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death
    });

  if (errors) {
    res.render('author_form', { title: 'Create Author', author: author, errors: errors});
    return;
  }
  else {
    //Data from form is valid

    author.save(function(err) {
      if (err) { return next(err); }
      //successful - redirect to new author record.
        res.redirect(author.url);
    })
  };
};

// Handle Author delete form on GET
exports.author_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST
exports.author_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET
exports.author_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST
exports.author_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Author update POST');
};
