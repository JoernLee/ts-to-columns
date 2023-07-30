import {InternalNodeType} from "@/layouts";
import {convertColumnsArray} from "@/layouts/converter/columnsArray";
import {convertProFormItem} from "@/layouts/converter/proFormItem";

export enum ConverterMode {
    COLUMNS_ARRAY,
    PRO_FORM_ITEM,
}

type ConverterConfigType = {
    convertFn: (internalNodes: InternalNodeType[]) => any;
    enableJSONStringify?: boolean;
};

export const ConverterConfig: Record<ConverterMode, ConverterConfigType> = {
    [ConverterMode.COLUMNS_ARRAY]: {
        convertFn: convertColumnsArray,
        enableJSONStringify: true,
    },
    [ConverterMode.PRO_FORM_ITEM]: {
        convertFn: convertProFormItem,
    },
};