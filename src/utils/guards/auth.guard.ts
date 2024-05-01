import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { validateJwt, CustomLogger, ExtendedRequestInterface, Roles } from "../../utils";

export interface UserPayload {
    id: string,
    name: string, 
    role:Roles,
}

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly logger = new CustomLogger(AuthGuard.name);

    private handleAuthentication(req: ExtendedRequestInterface) {
        const getAuthorization = req.headers['authorization'] as string;
        const res = validateJwt(getAuthorization, req);
        this.logger.log(`Request id: ${req?.id} for user id: ${req?.user?.id}`);
        return res;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const request = context.switchToHttp().getRequest();
        const data = this.handleAuthentication(request);

        return data;
    }
}