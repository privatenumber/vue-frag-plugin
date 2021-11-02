import path from 'path';
import fs from 'fs';

export const singleRootComponentPath = path.resolve(__dirname, './SingleRoot.vue');
export const singleRootComponent = fs.readFileSync(singleRootComponentPath, 'utf-8');

export const multiRootComponentPath = path.resolve(__dirname, './MultiRoot.vue');
export const multiRootComponent = fs.readFileSync(multiRootComponentPath, 'utf-8');

export const multiRootComponentWithScriptPath = path.resolve(__dirname, './MultiRootWithScript.vue');
export const multiRootComponentWithScript = fs.readFileSync(multiRootComponentWithScriptPath, 'utf-8');

export const multiRootComponentWithEmptyScriptPath = path.resolve(__dirname, './MultiRootWithEmptyScript.vue');
export const multiRootComponentWithEmptyScript = fs.readFileSync(multiRootComponentWithEmptyScriptPath, 'utf-8');

export const multiRootComponentWithTemplatePath = path.resolve(__dirname, './MultiRootWithTemplate.vue');
export const multiRootComponentWithTemplate = fs.readFileSync(multiRootComponentWithTemplatePath, 'utf-8');
