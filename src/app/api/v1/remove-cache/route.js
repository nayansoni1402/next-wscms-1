import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache'
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const path = searchParams.get('path');

    if(path == "all"){
        revalidatePath('/', 'layout');
    }else{
        revalidatePath(path);
        let newPath = path.startsWith('/') ? path.substring(1) : path
        redirect(`${process.env.NEXT_PUBLIC_APP_URL}${newPath}`);        
    }

    // const r = 
    return NextResponse.json({path});
}