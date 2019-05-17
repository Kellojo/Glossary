echo '   ________'                                 
echo '  / ____/ /___  ______________ ________  __ ' 
echo ' / / __/ / __ \/ ___/ ___/ __ `/ ___/ / / / ' 
echo '/ /_/ / / /_/ (__  |__  ) /_/ / /  / /_/ / ' 
echo '\____/_/\____/____/____/\__,_/_/   \__, / '  
echo '                                  /____/ '   
echo ''
echo 'Repository: https://github.com/Kellojo/Glossary'
echo 'Author: Kellojo'
echo ''
echo ''
echo 'Building Less for Glossary...'

lessc "../webapp/style/library.less" "../webapp/style/style.css"

echo 'Done!'
read -p 'Press enter to continue...'