const cleanObject = (obj: any) => {
  if (obj && typeof obj === "object") {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null || obj[key] === "") {
        delete obj[key];
      } else if (typeof obj[key] === "object") {
        cleanObject(obj[key]);
      }
    });
  }
  return obj;
};

export {cleanObject}
