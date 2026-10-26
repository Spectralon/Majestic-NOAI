import {StaticDataService} from "../infrastructure/services/StaticDataService";
import {WebSocket, WebSocketServer} from "ws";
import {ICommandService} from "./CommandService";

export class GameServer {
    private readonly _wss: WebSocketServer;
    private readonly _clients: Set<WebSocket> = new Set();

    private readonly _config;

    constructor(
        private readonly _commandService: ICommandService,
        staticData: StaticDataService
    ) {
        this._config = staticData.config;
        this._wss = new WebSocketServer({port: this._config.SERVER.wsPort});
    }

    async start() {
        this._wss.on('connection', ws => {
            this._clients.add(ws);
            const {SERVER, ...CLIENT} = this._config;
            this.sendPacket(ws, 'config', CLIENT);
            ws.on('message', packet => this.onMessage(ws, packet.toString()));
            ws.on('close', () => this._clients.delete(ws));
        });

        console.log(`Server started`);
    }

    stop(): void {
        this._wss.close();
        for (const client of this._clients)
            client.close();

        console.log(`Server stopped`);
    }

    broadcast(type: string, data?: any) {
        for (const ws of this._clients)
            if (ws.readyState === WebSocket.OPEN)
                this.sendPacket(ws, type, data);
    }

    private async onMessage(ws: WebSocket, packet: string): Promise<void> {
        try {
            const data = JSON.parse(packet);
            const result = await this._commandService.execute(data);
            if (result)
                this.sendPacket(ws, 'result', {ts: data.ts, data: result});
        } catch (e) {
            this.sendPacket(ws, 'error', {type: 'onMessage', payload: packet, err: e});
        }
    }

    private sendPacket(ws: WebSocket, type: string, packet: any) {
        ws.send(JSON.stringify({
            type: type,
            data: packet,
        }));
    }
}