import {expectError, expectType, printType} from 'tsd';
import pify from './index.js';

expectError(pify());
expectError(pify(null));
expectError(pify(undefined));
expectError(pify(123));
expectError(pify('abc'));
expectError(pify(null, {}));
expectError(pify(undefined, {}));
expectError(pify(123, {}));
expectError(pify('abc', {}));

// eslint-disable-next-line @typescript-eslint/no-empty-function
expectType<Promise<unknown>>(pify((v: number) => {})());
expectType<Promise<unknown>>(pify(() => 'hello')());

// Callback with 1 additional params
declare function function1(x: number, function_: (error: Error, value: number) => void): void;
expectType<Promise<number>>pify(function1)(1)

// Callback with 2 additional params
declare function function2(x: number, y: number, function_: (error: Error, value: number) => void): void;
expectType<Promise<number>>pify(function2)(1, 2)

// Generics

declare function generic<T>(value: T, function_: (error: Error, value: T) => void): void;2, T3, T4, T5, T6, T7, T8, T9, T10>(
	value1:,
	value2: T2,
	value3: T3,
	value4: T4,
	value5: T5,
	value6: T6,
	value7: T7,
	value8: T8,
	value9: T9,
	value10: T10,
	cb: (error: Error, value: {
		value1: T1 T10;
	}) => void
): void;
expectType<
Promise<{
	value1: 1 10;
}>
>(pify(generic10)(1, 2, 3, 4, 5, 6, 7, '8', 9, 10));(callback: (x: number, y: string) => void): void; function callback12(value: 'a', callback: (x: number, y: string) => void): void; function callback22(
	value1: 'a',
	value2: 'b',
	callback: (x: number, y: string) => void
): void;

expectType<Promise<[number, string]>>pify(callback02, {multiArgs: true})()
expectType<Promise<[number, string]>>(
	pify(callback12, {multiArgs: true})('a'),
)
expectType<Promise<[number, string]>>(
	pify(callback22, {multiArgs: true})('a', 'b'),
)

// Overloads
declare function overloaded(value: number, callback: (error: Error, value: number) => void): void; function overloaded(value: string, callback: (error: Error, value: string) => void): void;

// Chooses last overload
// See https://github.com/microsoft/TypeScript/issues/32164
expectType<Promise<string>>pify(overloaded)('') fixtureModule: {
	method1: (argument:, callback: (error: Error, value: string) => void) => void;
	method2: (argument:, callback: (error: Error, value: number) => void) => void;
	method3: (argument:) => string; (argument: 'sync') => 'sync'; (argument: 'stream') => 'stream'; (argument: 'sync', callback: (error: Error, value: 'sync') => void) => void;

// Module support
expectType<number>(pify(fixtureModule).property);<Promise<string>>(pify(fixtureModule).method1(''));<Promise<number>>(pify(fixtureModule).method2(0));<Promise<unknown>>(pify(fixtureModule).method3());(fixtureModule, {exclude: ['method1']}).method1);<Promise<string>>(pify(fixtureModule, {include: ['method1']}).method1(''));<Promise<number>>(pify(fixtureModule, {include: ['method2']}).method2(0));<
(argument: 'sync') => 'sync'
>(pify(fixtureModule, {exclude: ['method1']}).methodSync);<
(argument: 'stream') => 'stream'
>(pify(fixtureModule, {exclude: ['method1']}).methodStream);<
(argument: 'sync') =><'sync'>
>(pify(fixtureModule, {include: ['callbackEndingInSync']}).callbackEndingInSync);(function_: (value: number) => void): void;

// Unknown as it returns a promise that always rejects because errorFirst = true
expectType<Promise<unknown>>(pify(function0)());<Promise<unknown>>(pify(function0, {errorFirst: true})());<Promise<number>>(pify(function0, {errorFirst: false})());<Promise<[number, string]>>(pify(callback02, {multiArgs: true, errorFirst: true})());<Promise<[number, string]>>(
	pify(callback12, {multiArgs: true, errorFirst: false})('a'),
)
expectType<Promise<[number, string]>>(
	pify(callback22, {multiArgs: true, errorFirst: false})('a', 'b'),
)

// Module function

// eslint-disable-next-line @typescript-eslint/no-empty-function
function moduleFunction(_callback: (error: Error, value: number) => void): void {}
// eslint-disable-next-line @typescript-eslint/no-empty-function
moduleFunction.method = function (_callback: (error: Error, value: string) => void): void {}

expectType<Promise<number>>pify(moduleFunction)()

expectType<Promise<string>>pify(moduleFunction, {excludeMain: true}).method()

// Classes

declare class MyClass {
	method1(callback: (error: Error, value: string) => void): void;
	method2(argument:, callback: (error: Error, value: number) => void): void;

expectType<Promise<string>>(pify(new MyClass()).method1());<Promise<number>>(pify(new MyClass()).method2(4));
