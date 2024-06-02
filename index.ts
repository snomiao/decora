import { curry } from "rambda";

export default function decora<F, Alter extends (fn: F) => any>(fn: Alter) {
  return (
    target: any,
    key: PropertyKey,
    descriptor: TypedPropertyDescriptor<F>
  ) => {
    descriptor.value = fn(descriptor.value!);
  };
}
