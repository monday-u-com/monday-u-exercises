export function objectToQuerystring(params) {
    const qs = [];
    for (const key in params) {
        const value = params[key];
        if (value) {
            qs.push(`${key}=${value}`);
        }
    }
    return qs.length > 0 ? `?${qs.join('&')}` : '';
}
