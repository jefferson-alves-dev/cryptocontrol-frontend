// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'E-mail or Password cannot be empty.' });
  }

  try {
    const responseLogin = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (responseLogin.status === 200) {
      const { accessToken, refreshToken } = await responseLogin.json();
      return res.status(200).json({ accessToken, refreshToken });
    } else {
      const { message } = await responseLogin.json();
      return res.status(400).json({ message });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}
