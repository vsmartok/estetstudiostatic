import { deleteAsync} from "del";

export default function reset(path) {
    return deleteAsync(path);
}