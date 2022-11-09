import AuxiliaryDefinition from './auxiliary-definition';
import AuxiliaryHolder, { AuxiliaryConfig } from './auxiliary-holder';

export default interface Entity extends AuxiliaryHolder {
    Name?: string;
}