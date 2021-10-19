export async function asyncForEach<T>(
  array: Array<T>,
  callback: (item: T, index: number, og: T[]) => void
): Promise<void> {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const hello = async (args: unknown = {}): Promise<unknown> => {
  return args;
};

export const promisify = async (func: any) => {
  await Promise.resolve(func).then(function () {
    return;
  });
};
