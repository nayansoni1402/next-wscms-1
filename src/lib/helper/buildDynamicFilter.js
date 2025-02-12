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

export function buildDynamicFilterAvd(filters) {
    const where = {};

    filters.forEach(({ column, operator, value, connector }) => {
        if (operator === "LIKE") {
            where[column] = { contains: value.replace(/%/g, "") };
        } else if (operator === "IN") {
            where[column] = { in: value };
        } else {
            where[column] = value; // Handle other operators like "="
        }
    });

    return where;
}
