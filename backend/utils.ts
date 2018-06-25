import { Collection } from 'lokijs';

const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only this file types are allowed: jpg,jpeg,png,gif'), false);
    }
    cb(null, true);
};

const loadCollection = (collectionName, db: Loki): Promise<Collection<any>> =>
    new Promise(resolve => {
    db.loadDatabase({}, () => {
        const collection = db.getCollection(collectionName) || db.addCollection(collectionName);
        resolve(collection);
    });
});

export { imageFilter, loadCollection };
