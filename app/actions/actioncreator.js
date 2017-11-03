export const actionCreator = (type) => {
  return (value) => (
    {
      type: type,
      value: value
    }
  );
}
