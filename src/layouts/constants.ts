import {ConverterMode} from "@/layouts/converter";

export const MapOptions = [
    { value: ConverterMode.COLUMNS_ARRAY, label: '=> ColumnsArray' },
    { value: ConverterMode.PRO_FORM_ITEM, label: '=> ProFormItem' },
];

export const ExampleInput = `type exampleType = {
    /**我是字段注释*/
    code?: string;
    name?: string;
    message?: string;
    success?: boolean;
    count?: number;
}
`;