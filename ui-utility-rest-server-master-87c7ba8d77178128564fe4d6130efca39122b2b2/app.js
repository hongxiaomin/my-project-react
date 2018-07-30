const path = require('path');
const fs = require('fs');
const unzip = require('unzip');
const express = require('express');
const morgan = require('morgan');
const util = require('util');
const UPLOAD_PATH = path.join(__dirname, 'apps');
const HOST_PATH = path.join(__dirname, 'public', 'apps');
const upload = require('multer')({ dest: UPLOAD_PATH });
const {
  PAGES,
  GROUPS,
  COORDINATES,
  SUBJECTS,
  OCCUPATIONS,
} = require('./data');
const app = express();
const exec = util.promisify(require('child_process').exec);

app.use(express.static('public'));
app.use(morgan('tiny'));
app.use((req, res, next) => {
  const origins = ['http://10.120.136.90', 'http://localhost:8080', 'http://localhost:8000'];
  origins.forEach((origin) => {
    if ((req.headers.origin || req.headers.host).indexOf(origin) > -1) {
      res.header('Access-Control-Allow-Origin', origin);
    }
  });
  res.header('Access-Control-Allow-Headers', 'token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

const getShellScript = (filename) => (`
cd public/apps/${filename} && \
jspm install && \
jspm bundle app.js bundle-deps-packages.js
`);

// routing
// respond with "Hello World!" on the homepage
app.get('/pages', (req, res) => {
  res.json(PAGES);
});

app.get('/groups', (req, res) => {
  res.json(GROUPS);
});

app.get('/coordinates', (req, res) => {
  res.json(COORDINATES);
});

app.get('/subjects', (req, res) => {
  res.json(SUBJECTS);
});

app.get('/occupations', (req, res) => {
  res.json(OCCUPATIONS);
});

app.post('/apps', upload.single('file'), ({ file, query: { id: queryId } }, res) => {
  const id = typeof queryId === 'undefined' ? file.filename : queryId;
  fs
    .createReadStream(file.path)
    .pipe(unzip.Extract({ path: `${HOST_PATH}/${id}` }))
    .on('close', () => {
      res.json({ success: true, url: `http://10.120.136.90:3010/apps/${id}/` });
      fs.unlink(file.path, () => {});
      exec(getShellScript(id))
        .catch((err) => {
          console.log(err);
        });
    });
});


var server = app.listen(3010, function() {
	console.log('Listening at http://localhost:3010/');
});
