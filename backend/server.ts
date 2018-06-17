import * as cors from 'cors';
import * as express from 'express';
import * as fs from 'fs';
import * as Loki from 'lokijs';
import * as morgan from 'morgan';
import * as multer from 'multer';
import * as path from 'path';

import {imageFilter, loadCollection} from './utils';

const DB_NAME = 'db.json';
const COLLECTION_NAME = 'images';
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/`, fileFilter: imageFilter });
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });

const server = express();
server.use(express.static(path.join(__dirname, './dist/editor')));
server.use(express.static(path.join(__dirname, './dist/vr')));
server.use(cors());
server.use(morgan('dev'));

server.post('/images', upload.array('images', 12), async (req, res) => {
    try {
        const collection = await loadCollection(COLLECTION_NAME, db);
        const data = Array.prototype.concat(collection.insert(req.files));

        db.saveDatabase();
        res.send(data.map(img => ({ id: img.$loki, fileName: img.filename, originalName: img.originalname })));
    } catch (err) {
        res.sendStatus(400);
    }
});

server.get('/images', async (req, res) => {
    try {
        const col = await loadCollection(COLLECTION_NAME, db);
        res.send(col.data);
    } catch (err) {
        res.sendStatus(400);
    }
});

server.get('/images/:id', async (req, res) => {
    try {
        const col = await loadCollection(COLLECTION_NAME, db);
        const result = col.get(req.params.id);

        if (!result) {
            res.sendStatus(404);
            return;
        }

        res.setHeader('Content-Type', result.mimetype);
        fs.createReadStream(path.join(UPLOAD_PATH, result.filename)).pipe(res);
    } catch (err) {
        res.sendStatus(400);
    }
});

const vrPath = './dist/vr/index.html';
server.get('/vr', (req, res) => {
    res.sendFile(path.join(__dirname, vrPath));
});

const editorPath = './dist/editor/index.html';
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, editorPath));
});

const port = 8080;
server.listen(port, ()  => {
    console.log(`listening on port ${port}!`);
});
