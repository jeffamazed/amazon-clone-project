export function mockLocalStorageWith(data) {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jasmine
        .createSpy("getItem")
        .and.returnValue(JSON.stringify(data)),
      setItem: jasmine.createSpy("setItem"),
      removeItem: jasmine.createSpy("removeItem"),
      clear: jasmine.createSpy("clear"),
    },
    writable: true,
  });
}
