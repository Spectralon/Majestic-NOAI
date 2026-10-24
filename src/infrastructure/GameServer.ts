import {StaticDataService} from "./services/StaticDataService";
import {WebSocketServer, WebSocket} from "ws";
import {ICommandService} from "./services/CommandService";

export class GameServer {
    private readonly _wss: WebSocketServer;
    private readonly _clients: Set<WebSocket> = new Set();

    constructor(
        private readonly _commandService: ICommandService,
        staticData: StaticDataService
    ) {
        const cfg = staticData.config.SERVER;
        this._wss = new WebSocketServer({port: cfg.wsPort});
    }

    async start() {
        this._wss.on('connection', ws => {
            this._clients.add(ws);
            ws.on('message', packet => this.onMessage(ws, packet.toString()));
            ws.on('close', () => this._clients.delete(ws));
        })
    }

    stop(): void {
        this._wss.close();
        for (const client of this._clients)
            client.close();
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
                this.sendPacket(ws, 'result', result);
        } catch (e) {
            this.sendPacket(ws, 'error', e);
        }
    }

    private sendPacket(ws: WebSocket, type: string, packet: any) {
        ws.send(JSON.stringify({
            type: type,
            data: packet,
        }));
    }
}