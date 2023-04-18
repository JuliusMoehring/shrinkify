import type { APIContext } from 'astro';

export const get = async ({ params }: APIContext) => {
    const { origin } = params;

    return Response.redirect(`${import.meta.env.PUBLIC_API_URL}/${origin}`);
};
