//  Google Drive API
const google = require('googleapis');
const fs = require('fs');

const SCOPES = [
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/drive.metadata.readonly'
];

class GDriveApi {
    constructor() {
        fs.readFile('credentials.json', (err, content) => {
            if (err) {
                return console.log('Error loading client secret file:', err);
            }
        });
    }
}

module.exports = GDriveApi;