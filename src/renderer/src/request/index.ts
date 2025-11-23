import ky from "ky";

export const request = ky.extend({
    prefixUrl: '/api',
    hooks: {
        beforeRequest: [
            (request) => {
                const authorization = localStorage.getItem('authorization');
                if (authorization) {
                    request.headers.set('Authorization', authorization);
                }
            }
        ],
        afterResponse: [
            (request, options, response) => {
                if (response.status === 401) {
                    localStorage.removeItem('authorization');
                    window.location.href = '/login';
                }
            }
        ]
    }
})