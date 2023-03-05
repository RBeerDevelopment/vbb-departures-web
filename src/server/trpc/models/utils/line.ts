import type { LineType } from "./line-type";
import type { TransportType } from "./transport-type";
import type { VbbColor } from "./vbb-color";

// TODO validate mode and product against API docs
export interface Line {
    type: string;
    id: string;
    name: string;
    productName: string;
    mode: TransportType;
    product: LineType;
    symbol: string;
    nr: number;
    color: VbbColor;
}

export interface LineExtended extends Line {
    fahrtNr: string;
    public: boolean;
    adminCode: string;
    operator: Operator;
    metro: boolean;
    express: boolean;
    night: boolean;
    color: VbbColor;
}

interface Operator {
    type: string;
    id: string;
    name: string;
}