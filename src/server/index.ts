import express, { Request, Response } from 'express';
 import {api} from './api';
import session from 'cookie-session';
import { auth } from './auth';
const app = express();

// Add middleware to parse JSON bodies
app.use(express.json());

app.use(
  session({
    secret: process.env["SESSION_SECRET"] || 'secret',
})
)

app.use(auth)
 app.use(api)
app.get("/api/hi", (req: Request, res: Response) => {
  res.send("Hello");
});

app.use(express.static(process.cwd() + '/dist/angular-fs'));
app.listen(process.env['PORT']||3002, () => {
  console.log("Started :)");
});
