'use server';

import { EmailTemplate } from '@/components/app/shared/email-templates';
import { render, pretty } from '@react-email/render';
import { Resend } from 'resend';

export async function sendRefundEmail({
    preview,
    title,
    detail,
    to,
}: {
    preview: string;
    title: string;
    detail: string;
    to: string;
}) {    
    try{
        if (!process.env.RESEND_API_KEY) {
        throw new Error('Missing RESEND_API_KEY');
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const html = await pretty(
        await render(
            EmailTemplate({preview, title, detail})
        )
    );
    const { error } = await resend.emails.send({
        from: 'welcome <onboarding@resend.dev>',
        to: [to],
        subject: preview,
        html,
    });

    if (error) {
        console.error('Email error:', error);
        throw new Error(error.message);
    }
    }catch(e){
        console.log("Action error: ", e);
    }
}
