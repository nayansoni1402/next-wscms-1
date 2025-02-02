export function buildDynamicFilter(searchKey, searchableColumns) {
    if (!searchKey) return {}; // Return empty filter if no searchKey is provided

    return {
        OR: searchableColumns
            .map((column) => {
                if (column === "id") {
                    // Convert search key to number for exact match
                    const searchKeyAsNumber = parseInt(searchKey, 10);
                    if (!isNaN(searchKeyAsNumber)) {
                        return { [column]: searchKeyAsNumber };
                    }
                }
                return { [column]: { contains: searchKey.toLowerCase() } };
            }),
    };
}
