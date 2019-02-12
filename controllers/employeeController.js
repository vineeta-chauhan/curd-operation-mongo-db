const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewtitle: "Insert employe data"
    });
});
router.post('/', (req, res) => {
    insertRecord(req, res);
});


function insertRecord(req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if (!err) {
            res.redirect('employee/list');
        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewtitle: "Insert employee",
                });
            }
            else

                console.log('Error during record insertion :' + err);
        }

    });



}
router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render('employee/list', {
                list: docs
            });
        }
        else {
            console.log('Error in retrievig employee list :' + err);
        }
    });

});
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('employee/addOrEdit', {
                viewtitle: "Update Employee",
                employee: doc
            });
        }
    });
});

module.exports = router;