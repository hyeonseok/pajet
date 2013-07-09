rsync -avz -e ssh --exclude=.DS_Store --exclude=*.csv --exclude=data/* --delete ./www/ playground@pajet.net:pajet_html/
