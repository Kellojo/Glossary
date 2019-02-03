# Glossary

Glossary is what is says a glossary, saving words, their explanation and the source of that explanation in tables using a MySQL Database and a webserver capable of running php.


## Features
- Usersystem with login, logout, registration
- Users can create their own set of tables
- Words can be added to tables
- Words can be deleted from tables
- Words can be moved between tables

## Planned Features
- Delete tables
- Search functionality

## How can this be setup?
- Create a database named "Glossary" on your MySQL server.
- Update the credentials in the "Glossary"->"config.php" file.
- Put the whole "Glossary" folder on a webserver that runs php.
- It is advised to look up a recent guide on web server security for your web server.
- It is advised to use SSL.
- It is advised to use the latest version of PHP. (this is important for password security)
- Additionaly:
  - remove the "glossary.sql" file from the "Glossary" folder.
  - remove the "README.md" file from the "Glossary" folder.
  - As a best practice it is advised to not store your credentials in the "config.php" and save them in a config outside of the folder open to the web (there is a way to do this but I haven't looked into it yet).

## How does it look like?

### Login
![Login](https://imgur.com/dhtLeJ4)

### Overview
![Logged in user](https://imgur.com/zxRVkWw)

### Registration
![Registration](https://i.imgur.com/QrZjEEy.png)

### Adding a Word
![Adding a word](https://imgur.com/9hPBfBa)

### Adding a Table
![Adding a table](https://i.imgur.com/dKbECNj.png)

### Deleting a Word
![Deleting a word](https://imgur.com/9hPBfBa)

### Editing a Word
![Editing a Word](https://imgur.com/wUG2ABd)
