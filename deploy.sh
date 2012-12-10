rsync -avz -e ssh --exclude=.DS_Store --exclude=.git* --exclude=*.csv --exclude=data/* --exclude=*.sh --delete ./ accessibility@accessibility.kr:www/pajet/
