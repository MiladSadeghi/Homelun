export const sortOptionsCreator = (sort) => {
  let searchOptions;
  switch (sort) {
    case "sort_new":
      searchOptions = { sortField: "createdAt", sortOrder: -1 };
      break;
    case "sort_percent_off":
      searchOptions = { sortField: "offPercent", sortOrder: -1 };
      break;
    case "sort_high_low":
      searchOptions = { sortField: "price", sortOrder: -1 };
      break;
    case "sort_low_high":
      searchOptions = { sortField: "price", sortOrder: 1 };
      break;

    default:
      searchOptions = { sortField: "createdAt", sortOrder: -1 };
      break;
  }

  return { [searchOptions.sortField]: searchOptions.sortOrder };
};
