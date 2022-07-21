import {STATUS_FILTER_OPTIONS} from "../constants/status-filter-options";

export function filterByStatus(statusFilter, items) {
    switch (statusFilter) {
        case STATUS_FILTER_OPTIONS[0].value: {
            return items;
        }

        case STATUS_FILTER_OPTIONS[1].value: {
            return items.filter(item => item.status);
        }

        case STATUS_FILTER_OPTIONS[2].value: {
            return items.filter(item => !item.status);
        }

        default: {
            return items;
        }
    }
}