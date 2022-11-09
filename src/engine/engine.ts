import { FileUtils } from 'dok-file-utils';
import Auxiliaries from './auxiliary-loader';
import AuxiliaryDefinition, { Expression, Method } from './core/auxiliary-definition';
import AuxiliaryHolder, { AuxiliaryConfig } from './core/auxiliary-holder';
import Entity from './core/entity';

export default class Engine {
    readonly fileUtils;
    readonly pathSplit: string[] = [];

    constructor(fileUtils?: FileUtils) {
        this.fileUtils = fileUtils ?? new FileUtils(XMLHttpRequest);
    }

    async load(url: string = 'sample/sample.json') {
        return await this.fileUtils.load(url, 'json');
    }

    getPrimaryAuxiliaries(holder: AuxiliaryHolder) {
        return Object.keys(holder).filter(key => key.match(/^[A-Z]\w*$/)).sort();
    }

    getSecondaryAuxiliaries(holder?: AuxiliaryHolder) {
        return holder ? Object.keys(holder.aux ?? {}).sort() : [];
    }

    process(entity: Entity) {
        this.getPrimaryAuxiliaries(entity).forEach(key => {
            this.processAuxiliary(entity, key, entity[key], Auxiliaries[key]);
        });
        this.getSecondaryAuxiliaries(entity).forEach(key => {
            this.processAuxiliary(entity, key, entity.aux?.[key], Auxiliaries[key]);
        });
    }

    processAuxiliary(
        entity: AuxiliaryHolder,
        auxname: string,
        config: AuxiliaryConfig,
        processor?: AuxiliaryDefinition) {

        if (processor) {
            this.executeProcessor(entity, processor);
        }

        console.log("-------");
        console.log(entity);
        console.log(auxname);
        console.log(config);
        console.log(processor);
        this.getSecondaryAuxiliaries(processor).forEach(key => {
            this.processAuxiliary(entity, key, processor?.aux?.[key], Auxiliaries[key]);
        });
    }

    executeProcessor(entity: Entity, processor?: AuxiliaryDefinition) {
        this.processMethods(entity, processor?.process?.methods);
    }

    processMethods(entity: Entity, methods?: Method[]) {
        methods?.forEach(method => {
            entity[method.name] = this.generateExpressionFetcher(entity, method.return);
        });
    }

    generateExpressionFetcher(entity: Entity, expression?: Expression): null | (() => Promise<string | null | number | boolean>) {
        if (!expression) {
            return null;
        }
        if (typeof (expression) === 'object') {
            const subject = this.generateExpressionFetcher(entity, expression?.subject);
            const key = this.generateExpressionFetcher(entity, expression?.key);
            const check = this.generateExpressionFetcher(entity, expression?.check);
            return async () => {
                const s = await subject?.();
                const k = key ? await key() : null;
                if (s && k) {
                    console.log(">>", s, k);
                    return entity[`${s}`][`${k}`];
                }
                return undefined;
            };
        } else {
            return async () => expression;
        }
    }
}