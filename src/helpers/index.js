const isSameRow = (src, dest) => {
    return Math.floor(src / 8) === Math.floor(dest / 8);
}

const isSameColumn = (src, dest) => {
    return (src % 8) === (dest % 8);
}

const isSameDiagonal = (src, dest) => {
    return Math.abs(src - dest) % 7 === 0 || Math.abs(src - dest) % 9 === 0;
}

const isPathClean = (path, squares) => {
    return path.reduce((acc, curr) => { return !squares[curr] && acc; }, true);
}

module.exports = {
    isSameRow,
    isSameColumn,
    isSameDiagonal,
    isPathClean
}
