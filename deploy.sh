rsync -avz -e ssh --exclude=.DS_Store --exclude=.git* --exclude=*.csv --exclude=*.tsv --exclude=*.sh --delete ./ accessibility@accessibility.kr:www/pajet/
