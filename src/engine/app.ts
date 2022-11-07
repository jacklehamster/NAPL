import Entity from './core/entity';
import Scene from './scenes/scene';

export default interface App extends Entity {
    Scene: {
        scenes: Scene[];
    }
}