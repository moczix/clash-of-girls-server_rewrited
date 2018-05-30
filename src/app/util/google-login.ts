import {OAuth2Client} from 'google-auth-library';

export class GoogleLogin {
    private client: OAuth2Client;

    constructor() {
        this.client = new OAuth2Client();
    }

    async extractDataFromToken(idToken: string): Promise<{ googleId: string, email: string }> {
        try {
            const ticket = await this.client.verifyIdToken({
                idToken,
                audience: ['352766789318-st2inlq3lfjen0jeh4v8auobpmlggfbr.apps.googleusercontent.com']
            });
            return {
                googleId: ticket.getUserId(),
                email: ticket.getPayload().email
            }
        } catch (err) {
            return null;
        }
    }
}