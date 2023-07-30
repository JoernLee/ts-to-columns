import { getValueTypeFromNodeType } from './utils';
import {InternalNodeType} from "@/layouts";

export const convertColumnsArray = (internalNodes: InternalNodeType[]) => {
    return internalNodes.map((node) => {
        const column: Record<string, any> = {
            key: node.key,
            dataIndex: node.key,
            title: node.comment || node.key || '',
        };

        const valueType = getValueTypeFromNodeType(node);

        if (valueType) {
            column.valueType = valueType;
        }

        return column;
    });
};