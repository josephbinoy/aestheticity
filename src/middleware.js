import { NextResponse } from 'next/server'
 
export function middleware(request) {
    const requestedPath=request.nextUrl.pathname;
    const isPublidPath=requestedPath==="/login"||requestedPath==="/signup";
    const token=request.cookies.get('token');
    // if(requestedPath==="/mail")
    //     return NextResponse.redirect(new URL('/', request.nextUrl));
    if((!isPublidPath&&!token)||(isPublidPath&&token))
        return NextResponse.redirect(new URL('/', request.nextUrl));

}
 
export const config = {
    matcher: ["/login" , "/signup", "/profile/:id*"]
}