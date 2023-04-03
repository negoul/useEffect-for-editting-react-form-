import {PERMISSION_KEY} from 'config/variables.config';
import {isArray, isEmptyArray} from 'utils/functions.util';

export function hasPermissionLocalState(check) {
    const permissions = JSON.parse(localStorage.getItem(PERMISSION_KEY));

    if (!isEmptyArray(permissions)) {
        if (isArray(check)) {
            return check.every((check) => permissions.some((permission) => permission === check));
        } else {
            return (!check || permissions.some((permission) => permission === check));
        }
    }
    return false;
}