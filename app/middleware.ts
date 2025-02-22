import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken';
import type { NextApiRequest } from 'next'; // Import NextApiRequest type



async function authenticateToken(req: Request) {
  const secret_key = process.env.SECRET_KEY as string;
  const token = req.headers.get('authorization')?.split(' ')[1];

  if(token) {
      try {
          const decoded = jwt.verify(token, secret_key) as any;
          return decoded.id;
      } catch (error) {
          if (error instanceof jwt.TokenExpiredError) {
              redirect('/login')
          } else {
              throw error;
          }
      }
  } else {
      redirect('/login')
  }
}

export const middleware = async (req: NextApiRequest) => {
  const path = req.url;

  if (path !== '/login' && path !== '/api/login') {
    if (path === '/admin/dashboard') {
      redirect('/login');
    }
  }
}