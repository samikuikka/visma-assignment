import { z } from "zod";

/**
 * Validation schema for the URL
 */
const URLSchema = z.object({
    protocol: z.literal('visma-identity:'),
    host: z.enum(['login', 'confirm', 'sign'])
});

// Login parameter schema
const LoginSchema = z.object({
    source: z.string()
});

// Confirm parameter schema
const ConfirmSchema = z.object({
    source: z.string(),
    paymentnumber: z.coerce.number().int()
});

// Sign paramater schema
const SignSchema = z.object({
    source: z.string(),
    documentid: z.string()
});


/**
 * Class whivh validates the request and returns path and search params
 */
export class IdentifiedRequest {

    public path: string;
    public params: [string, string][];


    constructor(url_string: string) {
        // Check if url_string is actually an URL, throw error if not
        z.string().url().parse(url_string);

        // Now safe to send url_string to URL
        const url = new URL(url_string);

        // Parsing the URL
        URLSchema.parse(url);

        // Search params
        const params = Object.fromEntries(url.searchParams);
        
        // Parse request based on the type
        switch(url.host) {
            case 'login':
                LoginSchema.parse(params);
                break;
            case 'confirm':
                ConfirmSchema.parse(params);
                break;
            case 'sign':
                SignSchema.parse(params);
                break;
            default:
        }
        
        this.path = url.host;
        this.params = Object.entries(params);
    };
};

