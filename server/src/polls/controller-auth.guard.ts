import { CanActivate, ExecutionContext, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithAuth } from './types';

@Injectable()
export class ControllerAuthGuard implements CanActivate {
	private readonly logger = new Logger(ControllerAuthGuard.name);
	constructor(private readonly jwtService: JwtService) { }
	canActivate(context: ExecutionContext): boolean | Promise<boolean> {
		const request: RequestWithAuth = context.switchToHttp().getRequest();
		this.logger.debug(`Cheking for auth token to request body`, request.body);
		const { accessToken } = request.body;
		try {
			const payLoad = this.jwtService.verify(accessToken);
			//append user and poll to socket
			request.userID = payLoad.sub;
			request.pollID = payLoad.pollID;
			request.name = payLoad.name;
			return true;
		} catch {
			throw new ForbiddenException('Invalid authorization token');
		}
	}
}