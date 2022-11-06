import express, { Application, Request, Response } from 'express';
import serve from "express-static";
import fs from "fs";
import { extname } from 'path';
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

icongen('icon.png', './public/')
  .then((results) => {
    console.log(`${results.length} icons generated.`);
  })
  .catch((err) => {
    console.error(err)
  })

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
