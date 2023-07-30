// @ts-nocheck
import type { Node } from 'typescript';
import { createSourceFile, ScriptTarget, SyntaxKind } from 'typescript';
import { message } from 'antd';
import {InternalNodeType} from "@/layouts/index";
import {ConverterConfig, ConverterMode} from "@/layouts/converter";

const checkIsTypeAliasDeclaration = (node: Node) => {
    return node.kind === SyntaxKind.TypeAliasDeclaration;
};

const getNormalTypeFromKind = (node?: Node) => {
    switch (node?.kind) {
        case SyntaxKind.StringKeyword:
            return 'string';
        case SyntaxKind.NumberKeyword:
            return 'number';
        case SyntaxKind.BooleanKeyword:
            return 'boolean';
        default:
            return 'unknown';
    }
};

export const transformInputTypeAlias = (inputString?: string): InternalNodeType[] => {
    if (!inputString) {
        return [];
    }
    const typeNode = createSourceFile('type.ts', inputString, ScriptTarget.Latest, true)
        .statements[0];
    if (!checkIsTypeAliasDeclaration(typeNode)) {
        message.error('非TS类型定义代码，无法转换，请检查');
        return [];
    }
    const targetMembers = typeNode?.type?.members;
    if (!Array.isArray(targetMembers)) {
        message.error('TS类型定义内容为空，无法转换，请检查');
        return [];
    }
    return targetMembers.map((node: NodeObject) => {
        return {
            key: node?.name?.escapedText,
            type: getNormalTypeFromKind(node?.type),
            comment: node?.jsDoc?.[0]?.comment,
        };
    });
};

export const convertOutputContent = (
    internalNodes: InternalNodeType[],
    outputMode: ConverterMode,
) => {
    return ConverterConfig[outputMode]?.convertFn(internalNodes);
};

export const getMapResultFromTSInput = (inputString: string, outputMode: ConverterMode) => {
    const transformResult = transformInputTypeAlias(inputString);
    const outputResult = convertOutputContent(transformResult, outputMode);
    try {
        if (ConverterConfig[outputMode]?.enableJSONStringify) {
            return JSON.stringify(outputResult, null, 2);
        }
        return outputResult;
    } catch (e: any) {
        message.error(e?.toString());
        return '';
    }
};