// import { auth } from '@/lib/auth';
// import { cookies } from 'next/headers';

// export async function GET() {
//   // Get session using request cookies
//   const session = await auth.requestSession({ cookies });

//   if (!session) {
//     return new Response('Unauthorized', { status: 401 });
//   }

//   if (session.user.role !== 'ADMIN') {
//     return new Response('Forbidden', { status: 403 });
//   }

//   return new Response(JSON.stringify({ user: session.user }));
// }
