import { ZodError } from 'zod';
import { IdentifiedRequest } from './identity_service';

describe('IdentifiedRequest', () => {

    test('Not giving url gives error', () => {
        const not_url = '00101001010101';
        try {
            new IdentifiedRequest(not_url)
            expect(1).toBe(2);
        } catch (e) {
            expect(e).toBeInstanceOf(ZodError);
            const err = e as ZodError
            expect(err.issues.map(i => i.message)).toContain('Invalid url');
        }
    });

    test('Gives error on wrong protocol ("Visma schema")', () => {
        const url = 'visma-identityy://login?source=severa';
        try {
            new IdentifiedRequest(url);
            //Should give error, i.e., code continues from the catch
            expect(1).toBe(2);
        } catch (e) {
            expect(e).toBeInstanceOf(ZodError);
            const err = e as ZodError
            expect(err.issues.map(i => i.message)).toContain('Invalid literal value, expected "visma-identity:"');

        }

    });

    test('Works with correct protocol (= with correct visma schema)', () => {
        const url = 'visma-identity://login?source=severa';
        try {
            new IdentifiedRequest(url)
        } catch (e) {
            // Should not throw
            expect(1).toBe(2);
        }
    });

    describe('Path', () => {

        test('Works with correct path names', () => {
            const url1 = 'visma-identity://login?source=severa'
            const url2 = 'visma-identity://sign?source=vismasign&documentid=105ab44'
            const url3 = 'visma-identity://confirm?source=netvisor&paymentnumber=102226'
            try {
                new IdentifiedRequest(url1);
                new IdentifiedRequest(url2);
                new IdentifiedRequest(url3);
            } catch (e) {
                // Should not throw
                
                expect(1).toBe(2);
            }
        });

        test('Gives error with incorrect path name', () => {
            const url = 'visma-identity://register?source=severa'

            try {
                new IdentifiedRequest(url);
                expect(1).toBe(2);
            } catch (e) {
                expect(e).toBeInstanceOf(ZodError);
                const err = e as ZodError;
                expect(err.issues.map(i => i.message)).toContain("Invalid enum value. Expected 'login' | 'confirm' | 'sign', received 'register'");
            }
        });


    });

    describe('params', () => {

        describe('login', () => {

            test('Gives error when no params', () => {
                const url = 'visma-identity://login';

                try {
                    new IdentifiedRequest(url);
                    expect(1).toBe(2);
                } catch (e) {
                    expect(e).toBeInstanceOf(ZodError)
                    const err = e as ZodError;
                    expect(err.issues.map(i => i.message)).toContain('Required');
                }
            });

            test('No error when source defined', () => {
                const url1 = 'visma-identity://login?source='
                const url2 = 'visma-identity://login?source=test'

                try {
                    new IdentifiedRequest(url1)
                    new IdentifiedRequest(url2)

                } catch (e) {
                    expect(1).toBe(2);
                }
            });
        });

        describe('confirm', () => {

            test('Gives error when no params', () => {
                const url = 'visma-identity://confirm';

                try {
                    new IdentifiedRequest(url);
                    expect(1).toBe(2);
                } catch (e) {
                    expect(e).toBeInstanceOf(ZodError)
                    const err = e as ZodError;
                    expect(err.issues.map(i => i.message)).toContain('Required');
                }
            });

            test('Gives error if one of the params missing', () => {
                const url1 = 'visma-identity://confirm?source=abc';
                const url2 = 'visma-identity://confirm?paymentnumber=12121';

                try {
                    new IdentifiedRequest(url1)
                    expect(1).toBe(2);
                } catch (e) {
                }

                try {
                    new IdentifiedRequest(url2)
                    expect(1).toBe(2);
                } catch (e) {
                }
            });

            test('Give error when paymentnumber not integer', () => {
                const url1 = 'visma-identity://confirm?source=abc&paymentnumber=12121.5';
                const url2 = 'visma-identity://confirm?source=abc&paymentnumber=abc';

                try {
                    new IdentifiedRequest(url1);
                    expect(1).toBe(2);
                } catch(e) {
                    expect(e).toBeInstanceOf(ZodError)
                    const err = e as ZodError;
                    expect(err.issues.map(i => i.message)).toContain('Expected integer, received float');
                }
                try {
                    new IdentifiedRequest(url2);
                    expect(1).toBe(2);
                } catch(e) {
                    expect(e).toBeInstanceOf(ZodError)
                    const err = e as ZodError;
                    expect(err.issues.map(i => i.message)).toContain("Expected number, received nan");
                }
            });

            test('Can not give empty paymentnumber', () => {
                const url = 'visma-identity://confirm?source=abc&paymentnumber='
                try {
                    new IdentifiedRequest(url)
                    expect(1).toBe(2);
                } catch(e) {
                    // Should get here because no paymentnumber
                }
            });

            test('NO error when correct params', () => {
                const url = 'visma-identity://confirm?source=abc&paymentnumber=12'
                try {
                    new IdentifiedRequest(url)
                } catch(e) {
                    expect(1).toBe(2)
                }
            })

            
        })
    })

    test('Gives path name and params', () => {
        const url1 = 'visma-identity://login?source=severa';
        const url2 = 'visma-identity://confirm?source=abc&paymentnumber=12'
        const url3 = 'visma-identity://sign?source=vismasign&documentid=105ab44'

        try {
            const res = new IdentifiedRequest(url1);
            expect(res.path).toBe('login');
            expect(res.params[0]).toStrictEqual(['source', 'severa']);

            let res2 = new IdentifiedRequest(url2);
            expect(res2.path).toBe('confirm');
            expect(res2.params).toContainEqual(['paymentnumber', '12'])

            let res3 = new IdentifiedRequest(url3);
            expect(res3.path).toBe('sign');
            expect(res3.params).toContainEqual(['documentid', '105ab44']);
        } catch(e) {
            expect(1).toBe(2);
        }
    })
});