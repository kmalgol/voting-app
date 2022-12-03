import { BadRequestException, Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { OnGatewayInit, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage, WsException } from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { WsCatchAllFilter } from 'src/exceptions/ws-catch-all-filters';
import { WsBadRequestException } from 'src/exceptions/ws-exceptions';
import { PollsService } from './polls.service';
import { SocketWithAuth } from './types';

@UsePipes(new ValidationPipe())
@UseFilters(new WsCatchAllFilter())
@WebSocketGateway({ namespace: 'polls' })
export class PollsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	private readonly logger = new Logger(PollsGateway.name);
	constructor(private readonly pollsService: PollsService) { }

	@WebSocketServer() io: Namespace;

	afterInit(): void {
		this.logger.log(`Websocket Gateway initialized`);

	}

	handleConnection(client: SocketWithAuth) {
		const sockets = this.io.sockets;
		this.logger.debug(`Socket connected with userID: ${client.userID} with pollID: ${client.pollID}, and name: ${client.name}`);
		this.logger.log(`WS Client with id: ${client.id} connected!`);
		this.logger.debug(`Number of connected sockets: ${sockets.size}`);
		this.io.emit('hello', `from ${client.id}`);
	}

	handleDisconnect(client: SocketWithAuth) {
		const sockets = this.io.sockets;
		this.logger.log(`Disconnected socket id: ${client.id}`);
		this.logger.debug(`Number of connected sockets: ${sockets.size}`);
		//TODO - remove client from poll and send participants_updated event to remaining clients
	}

	@SubscribeMessage('test')
	async test() {
		throw new BadRequestException({ test: 'test' });
	}
}