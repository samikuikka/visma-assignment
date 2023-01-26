import { IdentifiedRequest } from './identity_service';

// For simplicity, I just use href instead of dividing it to smaller parts (e.g., protocol, hostname etc.)
// This url has no protocol in the string, e.g., hello.com instead of http://hello.com
interface OwnRequest {
    url: string
}



/**
 * Very simple "Client" which would then use the created IdentifiedRequest class.
 * The real client would be the API endpoint (e.g., Express route) which would then use the IdentifiedRequest
 */
const MockClient = (req: OwnRequest): string => {

    try {
        const request = new IdentifiedRequest(req.url);
        
        // Now we have identified request and can use it as we want, here I just log it out
        return request.path;
    } catch (e) {
        // Somethign went wrong on validation, i.e., not accepted request
        return 'Request failed!';
    }
}

export { MockClient };