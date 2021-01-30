interface StateCallback {
  (): void;
};


interface SetStateComplete<State> {
  (state: State): void;
};

interface SetState<State> {
  (state): void;
  (state, setStateComplete: SetStateComplete<State>): void;
  widthCompare?: any;
}
export function useStateHook<HookState>(state: HookState): [HookState, SetState<HookState>, SetState<HookState>] {
    const myState: HookState = useMemo(() => state, []);
    let updateValue = 0;
    const [update, setUpdate] = useState(updateValue);
    const afterUpdateQueue: Array<StateCallback> = useMemo(() => ([]), []);
    const afterUpdate = useCallback((cb) => {
      afterUpdateQueue.push(cb);
    }, []);

    useEffect(() => {
      // 遍历回调
      afterUpdateQueue.forEach((cb: StateCallback) => cb());
      // 清空长度
      afterUpdateQueue.length = 0;
    }, [update]);
    const setState: SetState<HookState> = useCallback((
      newState,
      setStateComplete: SetStateComplete<HookState> = () => { }
    ) => {
      // 直接更新状态（这里与 class 组件的 this.state 表示不一样）
      Object.assign(myState, newState);
      updateValue += 1;
      setUpdate(updateValue);
      afterUpdate(() => {
        setStateComplete(myState);
      });
    }, []);
    const setPureState: SetState<HookState> = (
      newState,
      setStateComplete: SetStateComplete<HookState> = () => { }
    ): void => {
      const shouldUpdate = objectEntries(newState).some(([key, value]) =>
        myState[key] !== value
      );
      if (shouldUpdate) { //需要更新
        setState(newState, setStateComplete);
      }
    };
    // 挂载一个类似装饰器一样的东西
    setState.widthCompare = setPureState;
    return [myState, setState, setPureState];
  };
