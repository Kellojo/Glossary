# Glossary

Glossary is what is says a glossary, saving words, their explanation and the source of that explanation in tables using a MySQL Database and a webserver capable of running php.


## Features
- Usersystem with login, logout, registration
- Users can create their own set of tables
- Words can be added
- Words can be deleted
- Words can be moved between tables

## Planned Features
- Delete tables
- Proper registration form
- Search functionality


## How can this be setup?
- Create a database named "Glossary" on your MySQL server.
- Update the credentials in the "Glossary"->"config.php" file.
- Put the whole "Glossary" folder on a webserver that runs php.
- Additionaly:
  - remove the "glossary.sql" file from the "Glossary" folder.
  - remove the "README.md" file from the "Glossary" folder.
  - As a best practice it is advised to not store your credentials in the "config.php" and save them in a config outside of the folder open to the web (there is a way to do this but I haven't looked into it yet).
  
  
  ## How to register a user?
  - Open the site and open the java-script developer console.
  - Type "register("#Username","#Password");" and press enter. (replace #Password with your password, replace #Username with your username)
