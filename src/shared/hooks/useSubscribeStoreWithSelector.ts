import { UseBoundStore } from "zustand";
import { StoreApi } from "zustand/vanilla";

import { useEffect } from "react";

import { storage } from "@shared/lib/storage";

type BoundStoreWithSelector<T> = UseBoundStore<StoreApi<T>> & {
  subscribe: <Slice>(
    selector: (state: T) => Slice,
    listener: (slice: Slice, prevSlice: Slice) => void,
    options?: {
      equalityFn?: (a: Slice, b: Slice) => boolean;
    },
  ) => () => void;
};

export const useSubscribeStoreWithSelector = <T, Slice>(
  store: BoundStoreWithSelector<T>,
  selector: (state: T) => Slice,
  key: string,
) => {
  useEffect(() => {
    const unsubscribe = store.subscribe(selector, (value) => {
      storage.set(key, JSON.stringify(value));
    });

    return unsubscribe;
  }, [store, selector, key]);
};
