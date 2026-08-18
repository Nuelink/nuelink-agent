globalThis.fetch = async () => {
  throw new Error("Network access is forbidden during dry-run contract tests.");
};
