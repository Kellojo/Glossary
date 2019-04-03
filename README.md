# Glossary

Glossary is what is says a glossary, saving words, their explanation and the source of that explanation in lists using a MySQL Database and a webserver capable of running php.


## Features
- Usersystem with login, logout, registration, forgot password
- Users can create their own set of lists
- Words can be added to lists
- Words can be deleted from lists
- Words can be modified
- Search across table
- Responsive, optimized for mobile devices


## How can this be setup?
- Create a firebae project
- Configure the firebase settings according to your project in the "/Component.js" file
- In your firebase project choose the Cloud Firestore and setup the following rules for it:

```
 service cloud.firestore {
  match /databases/{database}/documents {
    match /tables/{tableId} {
      allow create: if request.auth.uid != null && request.auth.uid == request.resource.data.owner;
      allow read, delete: if request.auth.uid != null && request.auth.uid == resource.data.owner;
    }
    
    match /words/{wordId} {
      allow read, delete: if request.auth.uid != null && request.auth.uid == get(/databases/$(database)/documents/tables/$(resource.data.table)).data.owner;
      allow create, update: if request.auth.uid != null && request.auth.uid == get(/databases/$(database)/documents/tables/$(request.resource.data.table)).data.owner;
    }
  }
} 
```

## How does it look like?

### Login
![Login](https://i.imgur.com/VfOCfJI.png)

### Overview
![Overview](https://i.imgur.com/v1ScduK.png)

### Registration
![Registration](https://i.imgur.com/SpvAGR5.png)

### Password Reset
![Registration](https://i.imgur.com/WgP1nze.png)

### Adding a Word
![Adding a word](https://i.imgur.com/1W4xzds.png)

### Creating a List
![Adding a list](https://i.imgur.com/OEgN9Jv.png)

### Deleting a Word
![Deleting a word](https://i.imgur.com/UXaSfNg.png)

### Editing a Word
![Editing a Word](https://i.imgur.com/uLSoIv0.png)

### Mobile Version
![Login](https://i.imgur.com/Q5sZ2PH.png)
![Overview](https://i.imgur.com/IRgu1B2.png)
![Editing a Word](https://i.imgur.com/BRGcqhk.png)
