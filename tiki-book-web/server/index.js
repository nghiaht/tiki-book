const express = require('express');
const path = require('path');
const util = require('util');

const app = express();

app.set('views', path.join(__dirname, './build'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const EXCLUDED = /(css|js|json|ico)$/;

const PORT = process.env.PORT || "3600";
const SERVICES_ROOT = process.env.SERVICES_ROOT || "";

app.get('/*', function (req, res, next) {
    if (EXCLUDED.test(req.path)) {
        // Pass to server static files
        next();
    } else {

        res.render('index.html', {
            servicesRoot: SERVICES_ROOT
        });
    }
});

app.use('/', express.static(path.join(__dirname, './build')));

app.listen(PORT, () =>
    console.log(`Listening on port ${PORT}`),
);

