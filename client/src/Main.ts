import { Test } from '../../server/shared/Test';

function getServerUrl() {
    switch (window.location.protocol) {
        case 'http:': {
            return `${window.location.protocol}//${window.location.hostname}:7070`;
        }
        case 'https:': {
            return `${window.location.protocol}//${window.location.hostname.split('.')[0]}.uc.r.appspot.com`;
        }
        default:
            throw new Error('running on invalid host');
    }
}

const serverUrl = getServerUrl();

fetch(`${serverUrl}/test`)
    .then((result) => result.json())
    .then((result) => document.write((result as Test).test));
