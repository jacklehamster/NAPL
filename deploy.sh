rm -rf site
mkdir -p site
rsync -av --delete \
  --exclude 'node_modules/' \
  --exclude '.git/' \
  --exclude '*.ts' \
  example/ site/
