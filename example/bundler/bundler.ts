import lightningcss from "bun-lightningcss";
import { Glob } from "bun";
import { dirname } from "node:path";

async function bundle() {
  const glob = new Glob("**/*{index,.worker}.ts");
  const allTsFiles = [];
  for await (const path of glob.scan("src")) {
    allTsFiles.push(path);
  }

  console.log(allTsFiles);

  return Promise.all(
    allTsFiles.map((tsFile) =>
      Bun.build({
        entrypoints: [`./src/${tsFile}`],
        outdir: `./dist/${dirname(tsFile)}`,
        minify: true,
        sourcemap: "external",
        target: "browser",
        plugins: [lightningcss()],
      }),
    ),
  );
}

const result = await bundle();
result?.forEach((r) => {
  r.logs.forEach((log, index) => console.log(index, log));
});

export {};
