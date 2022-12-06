
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NodeProperties {

}

export interface Message {
    payload: string | any
}

export interface Nodes {
    createNode(node: Node, config: NodeProperties): void;
    registerType(name: string, fct: (config: NodeProperties) => void): void;
}

export interface Red {
    nodes: Nodes
}

type OnInput = (msg: Message, send: (msgs: Message[]) => void, done: () => void) => void;
type OnClose = (removed: boolean, done: () => void) => void;

export interface Node {
    on(slot: string, fct: OnInput | OnClose): void;
    send: any;
}