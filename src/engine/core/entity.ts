import Auxiliary from './auxiliary';

export default interface Entity {
    Name?: string;
    aux?: Record<`^[A-Z]\w+`, Auxiliary>;
}