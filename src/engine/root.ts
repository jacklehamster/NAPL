import App from './app';
import Entity from './core/entity';

export default interface Root extends Entity {
    Workspace: {
        apps: App[];
    }
}