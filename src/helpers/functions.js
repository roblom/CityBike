/**
 * Uses 'fetch' to fetch the given URL
 * @param {string} url URL to fetch
 * @param {key/value object} headers to pass to 'fetch'
 * @returns object with 'result' + 'error', both default null, one will be populated.
 */
const fetchUrl = async function(url, headers) {
    const res = fetch(url, headers);
    const result = {
        data: null,
        error: null
    };

    await res.then(
        async response => { result.data = await response.json(); },
        async reject => {
            result.error = {
                url,
                message: reject.stack
            }
        }
    );
    return result;
}

export { fetchUrl };
