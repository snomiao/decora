/**
 * Decorator factory that applies a function to a method.
 * please enable "experimentalDecorators" in your tsconfig.json
 */
export default function decora<FnQ, FnR>(fn: (n: FnQ) => FnR) {
  return (
    target: any,
    key: PropertyKey,
    descriptor: TypedPropertyDescriptor<FnQ>,
  ) => {
    return {
      ...descriptor,
      value: fn(descriptor.value!),
    } as TypedPropertyDescriptor<FnR>;
  };
}
