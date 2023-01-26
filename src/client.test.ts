import { MockClient } from './client';

test('Request failes if invalid requests send to the client', () => {
    
    const res = MockClient({ url: 'visma-identity://confirm?source=abc&paymentnumber=12121.5'});
    expect(res).toBe('Request failed!');
});

test('Request succesful on valid request', () => {
    
    const res = MockClient({ url: 'visma-identity://confirm?source=abc&paymentnumber=12'});
    expect(res).toBe('confirm');
});