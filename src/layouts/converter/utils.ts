import {InternalNodeType} from "@/layouts";

export const getValueTypeFromNodeType = (node: InternalNodeType) => {
    switch (node.type) {
        case 'string': {
            return 'text';
        }
        case 'number': {
            return 'digit';
        }
        case 'boolean': {
            return 'select';
        }
        case 'unknown': {
            return null;
        }
        default:
            return null;
    }
};