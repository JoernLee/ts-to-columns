import {Select} from "antd";
import {useState} from "react";
import {ConverterMode} from "@/layouts/converter";
import {ExampleInput, MapOptions} from "@/layouts/constants";
import {getMapResultFromTSInput} from "@/layouts/utils";
import MonacoEditor from "react-monaco-editor/src/editor";
import ProCard from "@ant-design/pro-card";

export type InternalNodeType = {
    key: string;
    type: 'string' | 'number' | 'boolean' | 'unknown';
    comment?: string;
};

export default function HomePage() {

    const [inputString, setInputString] = useState(ExampleInput);
    const [outputString, setOutputString] = useState('');
    const [outputMode, setOutputMode] = useState(ConverterMode.COLUMNS_ARRAY);

    const handleInputChange = (value: any) => {
        setInputString(value);
    };

    const handleInputBlur = () => {
        setOutputString(getMapResultFromTSInput(inputString, outputMode));
    };

    const handleOutputModeChange = (value: any) => {
        setOutputMode(value);
        setOutputString(getMapResultFromTSInput(inputString, value));
    };

    const renderOutputEditorModeSelect = () => {
        return (
            <div>
                <span>映射模式选择：</span>
                <Select
                    defaultValue={ConverterMode.COLUMNS_ARRAY}
                    onChange={handleOutputModeChange}
                    options={MapOptions}
                />
            </div>
        );
    };

    return (
        <ProCard>
            <ProCard title="TS类型代码输入区域" onBlur={handleInputBlur} colSpan="50%">
                <MonacoEditor
                    key={'input'}
                    width={'100%'}
                    height={700}
                    language={'typescript'}
                    value={inputString}
                    onChange={handleInputChange}
                    options={{
                        selectOnLineNumbers: true,
                    }}
                />
            </ProCard>
            <ProCard title="映射结果" extra={renderOutputEditorModeSelect()}>
                <MonacoEditor
                    key={'output'}
                    width={'100%'}
                    height={700}
                    value={outputString}
                    options={{
                        selectOnLineNumbers: true,
                    }}
                />
            </ProCard>
        </ProCard>
    );
}