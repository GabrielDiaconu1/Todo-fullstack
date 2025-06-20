import express, { Router } from 'express';
import { UserInfo } from 'remult';

interface ExtendedUserInfo extends UserInfo {
  password: string;
}

const validUsers: ExtendedUserInfo[] = [
  { id: '1', name: 'Jane', roles: ['admin'], password: 'pass123' },
  { id: '2', name: 'Steve', password: 'test456' },
];

export const auth = Router();
auth.use(express.json());

auth.post("/api/signIn", (req, res) => {
  const { username, password } = req.body;
  const user = validUsers.find(
    user => user.name === username && user.password === password
  );

  if (user) {
    const { password, ...userWithoutPassword } = user; // don't store password in session
    req.session!['user'] = userWithoutPassword;
    res.json(userWithoutPassword);
  } else {
    res.status(401).send("Invalid username or password");
  }
});

auth.get("/api/currentUser", (req, res) => {
  res.json(req.session!['user'] || null);
});

auth.post("/api/signOut", (req, res) => {
  req.session!['user'] = null;
  res.json('ok');
});
