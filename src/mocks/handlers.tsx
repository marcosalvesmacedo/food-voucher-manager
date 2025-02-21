import { HttpResponse, http } from "msw";
import loginData from './data/loginData.json';
import loginErrorData from './data/loginErrorData.json';
import registerErrorData from './data/registerErrorData.json';
import registerData from './data/registerData.json'
import recoveryData from './data/recoveryData.json';
import recoveryErrorData from './data/recoveryErrorData.json';

export const handlers = [

  http.post('/api/login', async ({ request }) => {
    const { email, password } : any = await request.json();

    if (email === 't@t.com' && password === 'System@9') {
        return HttpResponse.json(loginData, { status: 200 });
    }

    if (email === 't@t.com' && password === 'System@1') {
      return HttpResponse.json(loginErrorData, { status: 401 });
    }

    return HttpResponse.json({}, { status: 500 });
  }),

  http.post('/api/register', async ({request}) => {
    const { username, user }: any = await request.json();
    if ( username === 'test test' && user === 't@t.com' ) {
      return HttpResponse.json(registerData, { status: 200 });
    }
    
    if ( username === 'testing testing' && user === 'testing@testing.com' ) {
      return HttpResponse.json(registerErrorData, { status: 401 });      
    }

    return HttpResponse.json({}, { status: 500 });
  }),

  http.post('/api/recovery', async ({request}) => {
    const { contact, contactType }: any = await request.json();

    if ( contact === 't@t.com' && contactType === 'email') {
      return HttpResponse.json(recoveryData, { status: 200 });
    }

    if ( contact === '(11) 99090-9090' && contactType === 'phone' ) {
      return HttpResponse.json(recoveryData, { status: 200 });
    }

    if ( contact === 'testing@testing.com' && contactType === 'email' ) {
      return HttpResponse.json(recoveryErrorData, { status: 420 });
    }

    return HttpResponse.json({}, { status: 500 });

  })

];