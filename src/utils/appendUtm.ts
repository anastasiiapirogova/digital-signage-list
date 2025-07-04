export const appendUtm = (url: string, isSponsor: boolean | undefined) => {
    const urlObj = new URL(url);

    urlObj.searchParams.set('utm_source', 'signagelist');
    urlObj.searchParams.set('utm_medium', 'referral');

    if (isSponsor) {
        urlObj.searchParams.set('utm_campaign', 'sponsor');
    } else {
        urlObj.searchParams.set('utm_campaign', 'listing');
    }
    
    urlObj.searchParams.set('ref', 'signagelist.org');

    return urlObj.toString();
}