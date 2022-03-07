interface IClassnamesWithoutBase {
  (...args: any[]): string;
}

interface IClassnamesWithBase {
  (baseClass: string, ...args: any[]): string;
  // 挂载到函数上的属性
  base?: string;
  withoutBase?: IClassnamesWithoutBase;
  mixin?: IClassnamesWithBase;
}

const classnamesWithBase: IClassnamesWithBase = (baseClass, ...args) =>
  args
    .map((item) => {
      if (typeof item === 'string') {
        return `${baseClass}__${item}`;
      }
      // KeyValue 类型
      return Object.entries(item)
        .filter(([, value]) => value)
        .map(([key]) => `${baseClass}__${key}`)
        .join(' ');
    })
    .join(' ');
  
const classnamesWithoutBase: IClassnamesWithoutBase = (...args) =>
    args
      .map((item) => {
        if (typeof item === 'string') return item;
        return Object.entries(item)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ');
      })
      .join(' ');

const mixinClassnames: IClassnamesWithBase = (baseClass, ...args) => {
  const withoutBase: any[] = [];
  const withBase: any[] = [];
  args.forEach((item) => {
    if (typeof item === 'string') {
      if (item.indexOf('@') === 0) {
        withoutBase.push(item.substr(1));
      } else {
        withBase.push(item);
      }
    } else {
      Object.entries(item).forEach(([key, value]) => {
        if (value) {
          if (key.indexOf('@') === 0) {
            withoutBase.push(key.substr(1));
          } else {
            withBase.push(key);
          }
        }
      })
    }
  });
  const withBaseClassNames = classnamesWithBase(baseClass, ...withBase);
  const withoutBaseClassNames = classnamesWithoutBase(...withoutBase);
  return [withBaseClassNames, withoutBaseClassNames].filter(item => item).join(' ');
};

export function useClassnames(baseClass: string) {
  const classnames = useCallback<IClassnamesWithBase>(
    (...args) => classnamesWithBase(baseClass, ...args),
    [baseClass]
  );
  classnames.withoutBase = useCallback<IClassnamesWithoutBase>(classnamesWithoutBase, []);
  classnames.mixin = useCallback<IClassnamesWithBase>((...args) => mixinClassnames(baseClass, ...args), [baseClass]);
  classnames.base = baseClass;
  return classnames;
}
