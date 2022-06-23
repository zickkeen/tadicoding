const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');


// service account kye file
const KEYFILEPATH = './api-key.json';

// Add drive scope will give us full access to Google Drive Account.
const SCOPES = ['https://www.googleapis.com/auth/drive'];

// init the auth with the needed keyfile and scope
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES
})

async function createAndUploadFile(auth) {
  // init drive service, it will now handle all authorization
  const driveService = google.drive({ version: 'v3', auth })
  let fileMetaData = {
    'name': 'icon.png',
    'parents': ['1_KRkj7MQsfxCJjAto6A-3BaUWhBb0S_3']
  }

  let media = {
    mimeType: 'image/png',
    body: fs.createReadStream('icon.png')
  }


  let response = await driveService.files.create({
    resource: fileMetaData,
    media: media,
    fields: 'id'
  })

  // handle the response

  switch (response.status) {
    case 200:
      console.log('File created id:', response.data.id)
      break;
    default:
      console.error('Error creating file, ' + response.errors)
      break;
  }
}

createAndUploadFile(auth).catch(console.error);