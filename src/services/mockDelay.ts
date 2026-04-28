export const mockDelay = async (duration = 450) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
