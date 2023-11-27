const api = process.env.REACT_APP_API;

export async function getAllSecurities(): Promise<any> {
    return fetch(`${api}/security_list`, { method: 'GET' });
};

export async function getSecurityDetail(ticker: string): Promise<any> {
    return fetch(`${api}/security_detail/${ticker}`, { method: 'GET' });
};