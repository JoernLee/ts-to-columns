import {InternalNodeType} from "@/layouts";

export const convertProFormItem = (internalNodes: InternalNodeType[]) => {
    const array = internalNodes.map((node) => {
        switch (node.type) {
            case 'string':
                return `<ProFormText name={'${node.key}'} label={'${node.comment || node.key || ''}'}/>`;
            case 'number':
                return `<ProFormDigit name={'${node.key}'} label={'${node.comment || node.key || ''}'}/>`;
            case 'boolean':
                return `<ProFormSelect name={'${node.key}'} label={'${node.comment || node.key || ''}'}/>`;
            case 'unknown':
            default:
                return `<ProFormText name={'${node.key}'} label={'${node.comment || node.key || ''}'}/>`;
        }
    });
    return array.join('\n');
};