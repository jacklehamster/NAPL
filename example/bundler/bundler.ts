import lightningcss from "bun-lightningcss";
import { Glob } from "bun";
import { dirname } from "node:path";

async function bundle() {
  const glob = new Glob("**/{index,*.worker}.ts");
  const allTsFiles = [];
  for await (const path of glob.scan("src")) {
    allTsFiles.push(path);
  }

  console.log(allTsFiles);

  return Promise.all(
    allTsFiles.map((tsFile) => {
      console.log(`Bundling ${tsFile}...`, dirname(tsFile));
      return Bun.build({
        entrypoints: [`./src/${tsFile}`],
        outdir: `./dist/${dirname(tsFile)}`,
        minify: true,
        sourcemap: "linked",
        target: "browser",
        plugins: [lightningcss()],
      });
    }),
  );
}

const result = await bundle();
for (const r of result) {
  for (let output of r.outputs) {
    console.log(output.path);
  }
  r.logs.forEach((log, index) => console.log(index, log));
}

export {};
