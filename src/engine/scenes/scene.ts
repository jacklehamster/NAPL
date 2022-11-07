import Entity from '../core/entity';

interface Dialog {
    message: string;
}

export default interface Scene extends Entity {
    Dialog?: string | Dialog;
}
