bun run build && bun run build:dev

rm -rf site
mkdir -p site
# Copy example/ -> site/ while excluding node_modules
tar -C example \
  --exclude='./node_modules' \
  --exclude='./.git' \
  -cf - . \
| tar -C site -xf -