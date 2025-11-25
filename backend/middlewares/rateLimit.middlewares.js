import { CreateRateLimitWindow } from "../utils/rateLimitWindow.utils.js"

// export interface RateLimitMiddlewareOptions extends RateLimitOptions {
//     userIP?: (req: Request) => string;

// }

// export const rateLimitMiddlewareFactory = (options: RateLimitOptions) => {
export const rateLimitMiddlewareFactory = (options) => {
    const rateLimiter = new CreateRateLimitWindow(options);

    // const ip = (req: Request) => req.ip;

    // return function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
    return function rateLimitMiddleware(req, res, next) {
        const userIP = req.ip || req.headers['x-forwarded-for'];

        if(!rateLimiter.isAllowed(userIP)) {
            console.log("Too many requests, please try after some time.");
            res.status(429).json({error: "Too many requests, please try after some time."});
            return;
        }

        next();
    };
}