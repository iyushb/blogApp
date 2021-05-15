const express = require('express');
const router = express.Router();

const blog = require('../models/blogs');

//index route
router.get('/', function (req, res) {
    res.redirect('blog');
});

//blog(index) route
router.get('/blog', function (req, res) {
    blog.find({}, function (err, foundBlogs) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                blog: foundBlogs
            });
        }
    })
});

//New blog route(form)
router.get('/blog/new', function (req, res) {
    res.render('addblog');
});
//Create new blog post route
router.post('/blog', function (req, res) {
    let blog_name = req.body.blog_name;
    let blog_img = req.body.blog_img;
    let blog_description = req.body.blog_description;

    let newBlog = {
        name: blog_name,
        image: blog_img,
        description: blog_description
    };
    blog.create(newBlog, (err, newBlog) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('blog');
        }
    });
});

router.get('/blog/:id', function (req, res) {
    blog.findById(req.params.id, function (err, reqBlog) {
        if (err) {
            console.log('---search error---');
        } else {
            res.render('show', {
                reqBlog: reqBlog
            });
        }
    })
});

router.delete('/blog/:id/delete', function (req, res) {
    blog.findByIdAndDelete({
        _id: req.params.id
    }, function (err, blog) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/blog');
        }
    })
});

router.get('/blog/:id/edit', (req, res) => {
    blog.findById(req.params.id, (err, blog) => {
        if (err) {
            console.log(err);
        } else {
            res.render('edit', {
                blog: blog
            });
        }
    })
});

router.put('/blog/:id', (req, res) => {
    var update = {
        name: req.body.blog_name,
        image: req.body.blog_img,
        description: req.body.blog_description
    };
    blog.findByIdAndUpdate(req.params.id, update, (err, success) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/blog' + req.params.id);
        }
    })
});

module.exports = router;