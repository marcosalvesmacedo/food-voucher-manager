import { HttpResponse, http } from "msw";
import loginData from './data/loginData.json';
import loginErrorData from './data/loginErrorData.json';

export const handlers = [

  http.post('/api/login', async ({ request }) => {
    const { email, password } : any = await request.json();

    if (email === 't@t.com' && password === 'System@9') {
        return HttpResponse.json(loginData, { status: 200 });
    }

    //return HttpResponse.json(loginErrorData, { status: 401 });
    return HttpResponse.json({}, { status: 500 });
  }),

];