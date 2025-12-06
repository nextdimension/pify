/* eslint-disable @typescript-eslint/ban-types */

type LastArrayElement<T extends readonly unknown[]> = T extends [...any, infer L]
	? L
	: never;

type DropLastArrayElement<T extends readonly unknown[]> = T extends [...(infer U), unknown]
	? U
	: [];

typeextends readonly unknown[], Excludes extends readonly unknown[], MultiArgs extends = false, ErrorFirst extends = true, ExcludeMain extends boolean = false> = {
	multiArgs?: MultiArgs;
	include?: Includes;
	exclude?: Excludes;
	errorFirst?: ErrorFirst;
	promiseModule?: PromiseConstructor;
	excludeMain?: ExcludeMain;
};

type InternalOptions<Includes extends readonly unknown[], Excludes extends readonly unknown[], MultiArgs extends = false, ErrorFirst extends boolean = true> = {
	multiArgs: MultiArgs;
	include: Includes;
	exclude: Excludes;
	errorFirst: ErrorFirst;
};

type Promisify<Args extends unknown[], GenericOptions extends InternalOptions<readonly unknown[], readonly unknown[], boolean, boolean>> = (
	...args: DropLastArrayElement<Args>
) =>
LastArrayElement<Args> extends (...arguments_:) => any
// For single-argument functions when errorFirst: true we just return Promise<unknown> as it will always reject.
	? Parameters<LastArrayElement<Args>> extends [infer SingleCallbackArg] ? GenericOptions extends {errorFirst: true Promise<unknown> : Promise<SingleCallbackArg>
		: Promise<
		GenericOptions extends {multiArgs: false LastArrayElement<Parameters<LastArrayElement<Args>>>
			: Parameters<LastArrayElement<Args>>
		>
	// Functions without a callback will return a promise that never settles. We model this as Promise<unknown>
	: Promise<unknown>; PromisifyModule<
	Module extends<string,>,
	MultiArgs extends boolean,
	ErrorFirst extends boolean,
	Includes extends ReadonlyArray<keyof Module>,
	Excludes extends ReadonlyArray<keyof Module>,
> = {
	[K in keyof Module]: Module[K] extends (...arguments_: infer) => any
		? K extends, Excludes, MultiArgs>>
			: K extends Excludes[number]
				? Module[K]
				: StringEndsWith<K, 'Sync' | 'Stream'> extends true
					? Module[K]
					: Promisify<Arguments, InternalOptions<Includes, Excludes, MultiArgs, ErrorFirst>>
		:
	options?: Options<[], [], MultiArgs, ErrorFirst>
): Promisify<[FirstArgument, ...Arguments],<[], [], MultiArgs, ErrorFirst>>;
	options?: Options<Includes, Excludes, MultiArgs, ErrorFirst, true>
): PromisifyModule<Module, MultiArgs, ErrorFirst, Includes, Excludes>;
