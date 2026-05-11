"use client";
/* eslint-disable react-hooks/refs */

import { useMemo, useRef, useSyncExternalStore } from "react";

const defaultIsEqual = Object.is;

type Subscribe = (onStoreChange: () => void) => () => void;

type GetSnapshot<T> = () => T;

type Selector<Snapshot, Selection> = (snapshot: Snapshot) => Selection;

type EqualityFn<T> = (a: T, b: T) => boolean;

export function useSyncExternalStoreWithSelector<
  Snapshot,
  Selection
>(
  subscribe: Subscribe,
  getSnapshot: GetSnapshot<Snapshot>,
  getServerSnapshot: GetSnapshot<Snapshot> | undefined,
  selector: Selector<Snapshot, Selection>,
  isEqual: EqualityFn<Selection> = defaultIsEqual
): Selection {
  const latestSelection = useRef<Selection | undefined>(undefined);
  const latestSnapshot = useRef<Snapshot | undefined>(undefined);
  const latestSelector = useRef(selector);
  const latestIsEqual = useRef(isEqual);

  latestSelector.current = selector;
  latestIsEqual.current = isEqual;

  const getSelectedSnapshot = useMemo(() => {
    return () => {
      const snapshot = getSnapshot();
      if (latestSnapshot.current !== snapshot) {
        latestSnapshot.current = snapshot;
        latestSelection.current = latestSelector.current(snapshot);
      } else if (latestSelection.current === undefined) {
        latestSelection.current = latestSelector.current(snapshot);
      }
      return latestSelection.current as Selection;
    };
  }, [getSnapshot]);

  const getServerSelectedSnapshot = useMemo(() => {
    if (!getServerSnapshot) {
      return undefined;
    }

    return () => {
      const snapshot = getServerSnapshot();
      return latestSelector.current(snapshot);
    };
  }, [getServerSnapshot]);

  const selection = useSyncExternalStore(
    subscribe,
    () => {
      const nextSelection = getSelectedSnapshot();
      const prevSelection = latestSelection.current;
      if (
        prevSelection !== undefined &&
        latestIsEqual.current(prevSelection, nextSelection)
      ) {
        return prevSelection;
      }
      latestSelection.current = nextSelection;
      return nextSelection;
    },
    getServerSelectedSnapshot
      ? () => {
          const serverSelection = getServerSelectedSnapshot();
          latestSelection.current = serverSelection;
          return serverSelection;
        }
      : getSelectedSnapshot
  );

  latestSelection.current = selection;

  return selection;
}

const useSyncExternalStoreExports = {
  useSyncExternalStoreWithSelector,
};

export default useSyncExternalStoreExports;
