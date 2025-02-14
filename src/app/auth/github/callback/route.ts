import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
        return NextResponse.redirect('/');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/callback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        });
        if (response.ok) {
            const setCookie = response.headers.get("set-cookie");
            if (setCookie) {
                const redirectResponse = NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URL}`);
                redirectResponse.headers.set('Set-Cookie', setCookie);
                return redirectResponse;
            }
        } else {
            console.error('Error:', response.status);
        }
    } catch (error) {
        console.error("GitHub Auth Error:", error);
    }
    redirect('/');
}
