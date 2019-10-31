export const debounce = (callback: Function, timeoutMs: number, shouldHandleFirstCall = false) => {
  let lastCall = shouldHandleFirstCall ? -1 : performance.now();
  let timeoutHandle: NodeJS.Timeout;

  return {
    handler: (...args: any[]) => {
      clearTimeout(timeoutHandle);
      const now = performance.now();
      const delta = now - lastCall;
      const shouldCallNow = delta > timeoutMs;

      if (shouldCallNow) {
        lastCall = now;
        callback(...args);
      } else {
        timeoutHandle = setTimeout(() => {
          lastCall = performance.now();
          callback(...args);
        }, timeoutMs);
      }
    },
    cancel: () => clearTimeout(timeoutHandle),
  }
};
