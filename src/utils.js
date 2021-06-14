import process from "process";

const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

function isDevelopment() {
  return development;
}

function browserifyLink(link) {
  return !link.match(/^(http|https):\/\//i) ? `http://${link}` : link;
}

function copyToClipboard(textToCopy) {
  const tempElement = document.createElement("textarea");
  tempElement.value = textToCopy;
  document.body.appendChild(tempElement);
  tempElement.select();
  document.execCommand("copy");
  document.body.removeChild(tempElement);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export {
  stableSort,
  isDevelopment,
  getComparator,
  browserifyLink,
  copyToClipboard,
};
