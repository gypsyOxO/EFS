
export function groupBy(list, groupby) {
    return list.reduce((a, b) => {
       (a[b[groupby]] = a[b[groupby]] || []).push(b);
       return a;
    }, {});
}
