// export interface RateLimitOptions {
//     window: number;
//     maxRequests: number;
// }

// interface LimiterWindow {
//     reqCtr: number;
//     windowStartTime: number;
// }

export class CreateRateLimitWindow {
    // private readonly window: number;
    // private readonly maxRequests: number;
    // private readonly store: Map<string, LimiterWindow>;

    // constructor(options: RateLimitOptions) {
    constructor(options) {
        this.window = options.window;
        this.maxRequests = options.maxRequests;
        this.store = new Map();
    }

    // isAllowed(ip: string): boolean {
    isAllowed(ip) {
        console.log(this.store, "store");
        const currDate = Date.now();

        const existingUser = this.store.get(ip);
        if(!existingUser) {
            this.store.set(ip, {reqCtr: 1, windowStartTime: currDate});
            return true;
        }

        const elapsedTime = currDate - existingUser.windowStartTime;
        if(elapsedTime >= this.window) {
            this.store.set(ip, {reqCtr: 1, windowStartTime: currDate});
            return true;
        }
        
        if(existingUser.reqCtr < this.maxRequests) {
            existingUser.reqCtr += 1;
            this.store.set(ip, existingUser);
            return true;
        }
        
        return false;
    }
}