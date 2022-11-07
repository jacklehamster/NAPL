import {FileUtils} from 'dok-file-utils';
import Entity from './core/entity';

export default class Engine {
    readonly fileUtils;

    constructor(fileUtils?: FileUtils) {
        this.fileUtils = fileUtils ?? new FileUtils(XMLHttpRequest);
    }

    async load(url: string = 'sample/sample.json') {
        return await this.fileUtils.load(url, 'json');
    }

    getAuxiliaries(entity: Entity) {
    }

    process(entity: Entity) {
        console.log(Object.keys(entity));
        console.log(Object.keys(entity.aux ?? {}));
    }
}