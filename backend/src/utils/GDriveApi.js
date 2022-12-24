//  Google Drive API
const google = require('googleapis');
const fs = require('fs');

const SCOPES = [
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/drive.metadata.readonly'
];

class GDriveApi {
    constructor() {
    }
}

module.exports = GDriveApi;