import AuxiliaryHolder from "./auxiliary-holder";

export interface Method {
    name: string;
    return: Expression;
}

export type Expression = string | null | number | {
    subject?: Expression;
    key?: Expression
    equivalent?: Expression;
    load?: string | {
        url: Expression;
    };
    condition?: Expression;
    check?: string;
    goDeep?: {
        type: string;
        sequence: Expression[];
    };
    assignTo?: string;
}

export interface Process {
    lang?: string;
    methods?: Method[];
    sequence?: Expression[];
}

export default interface AuxiliaryDefinition extends AuxiliaryHolder {
    $schema: string;
    namespace: string;
    process?: Process;
    [key: string]: any;
}