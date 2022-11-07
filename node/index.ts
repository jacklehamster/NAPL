import express, { Application, Request, Response } from 'express';
// @ts-ignore
import serve from "express-static";
import fs from "fs";
import icongen from 'icon-gen';

const app: Application = express();
const PORT = process.env.PORT || 8000;
app.get("/", async (req: Request, res: Response): Promise<void> => {
  res.writeHead(200, { "Content-Type": "text/html" });
  const html = await fs.promises.readFile(`./public/index.html`);
  res.write(html);
  res.end();
});

//@ts-ignore
app.use(serve("./public", null));

async function deepRegister(files: string[], pathSplit: string[] = []): Promise<void> {
    const fileNames = files.map(path => path.split("/").pop());
    const fileStats = files.map(file => fs.lstatSync([...pathSplit, file].join("/")));
    const folders = files.filter((f, index) => !fileStats[index].isFile())
        .filter(f => !f.startsWith("."));

    for (let folder of folders) {
        await deepRegister(fs.readdirSync([...pathSplit, folder].join("/")), [...pathSplit, folder]);
    }

    if (fileNames.includes(".register")) {
        const actualFiles = files.filter((f, index) => fileStats[index].isFile());

        const classNames = actualFiles.filter(f => f !== ".register")
            .map(folder => folder.split(".")[0]);

        const [targetFile, tag] = fs.readFileSync([...pathSplit, '.register'].join("/"), {
            encoding: 'utf-8',
        }).split("\n");

        const source = fs.readFileSync(targetFile, {
            encoding: 'utf-8',
        });
        const lines = source.split("\n");

        const output: string[] = [];
        let tagStart = false;
        lines.forEach(line => {
           if (tagStart) {
               if (line.includes(`${tag} END`)) {
                   output.push(line);
                   tagStart = false;
               }
               return;
           }
           output.push(line);
           if (line.includes(`${tag} START`)) {
               tagStart = true;
               const { groups } = line.match(new RegExp(`${tag}\\sSTART:\\s\\[(?<template>[^\\]]*)\\]`)) ?? {};
               const template = groups?.template ?? "";

               classNames.forEach(className => {
                   output.push(template.replaceAll('$className', className));
               });
           }
        });
        if (output.join("\n") !== source) {
            fs.writeFileSync(targetFile, output.join("\n"));
        }
    }
}

async function start(): Promise<void> {
    icongen('icon.png', './public/')
        .then((results) => {
            console.log(`${results.length} icons generated.`);
        })
        .catch((err) => {
            console.error(err)
        })

    const folders: string[] = await fs.promises.readdir('.');
    await deepRegister(folders);

    await new Promise(resolve => {
        app.listen(PORT, (): void => {
            console.log(`Server Running here 👉 https://localhost:${PORT}`);
            resolve(null);
        });
    });
}

start();