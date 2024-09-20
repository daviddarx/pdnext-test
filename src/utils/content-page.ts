export const getCleanedAnchorID = (anchorID: string | undefined) => {
  if (anchorID) {
    return anchorID
      .toLowerCase()
      .replace(' ', '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  } else {
    return undefined;
  }
};
