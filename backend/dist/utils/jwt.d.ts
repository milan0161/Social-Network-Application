export declare const p: string;
type Payload = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
};
declare const signAtoken: (user: Payload) => string;
declare const signRToken: (id: string) => string;
export { signAtoken, signRToken };
