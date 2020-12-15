import { useRef, useEffect } from "react";
import _ from "lodash";

export const deepCompareEquals = (a, b) => {
  return _.isEqual(a, b);
};

export const useDeepCompareMemoize = (value) => {
  const ref = useRef();

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
};

export const useDeepCompareEffect = (callback, dependencies) => {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
};
