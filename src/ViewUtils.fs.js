import { toString, Record } from "./.fable/fable-library.3.1.1/Types.js";
import { record_type, string_type } from "./.fable/fable-library.3.1.1/Reflection.js";
import { equals } from "./.fable/fable-library.3.1.1/Util.js";
import { head, empty, ofSeq, singleton, append } from "./.fable/fable-library.3.1.1/List.js";
import { substring, printf, toText, join } from "./.fable/fable-library.3.1.1/String.js";
import { SearchMode } from "./Model.fs.js";
import { toString as toString_1, date as date_1, equals as equals_1 } from "./.fable/fable-library.3.1.1/Date.js";

export class EventRow extends Record {
    constructor(CollectionName, EventId, Description, Date$, Time) {
        super();
        this.CollectionName = CollectionName;
        this.EventId = EventId;
        this.Description = Description;
        this.Date = Date$;
        this.Time = Time;
    }
}

export function EventRow$reflection() {
    return record_type("EventStoreViewer.ViewUtils.EventRow", [], EventRow, () => [["CollectionName", string_type], ["EventId", string_type], ["Description", string_type], ["Date", string_type], ["Time", string_type]]);
}

function getCommonRange(xs_mut, ys_mut, result_mut) {
    getCommonRange:
    while (true) {
        const xs = xs_mut, ys = ys_mut, result = result_mut;
        const matchValue = [xs, ys];
        let pattern_matching_result, x, xs_1, y, ys_1;
        if (matchValue[0].tail != null) {
            if (matchValue[1].tail != null) {
                pattern_matching_result = 1;
                x = matchValue[0].head;
                xs_1 = matchValue[0].tail;
                y = matchValue[1].head;
                ys_1 = matchValue[1].tail;
            }
            else {
                pattern_matching_result = 0;
            }
        }
        else {
            pattern_matching_result = 0;
        }
        switch (pattern_matching_result) {
            case 0: {
                return result;
            }
            case 1: {
                if (equals(x, y)) {
                    xs_mut = xs_1;
                    ys_mut = ys_1;
                    result_mut = append(result, singleton(x));
                    continue getCommonRange;
                }
                else {
                    return result;
                }
            }
        }
        break;
    }
}

function getCommonSubstring(s1, s2) {
    return join("", Array.from(getCommonRange(ofSeq(s1.split("")), ofSeq(s2.split("")), empty())));
}

export function getCollectionDisplayName(collection) {
    switch (collection.tag) {
        case 1: {
            return "Radioarkiv";
        }
        case 2: {
            return "Subtitles";
        }
        case 3: {
            return "Potion";
        }
        case 4: {
            return "Failed Messages";
        }
        default: {
            return "Omnibus";
        }
    }
}

export function createResultRow(result, event, model) {
    let carrierId, id, serviceName, id_1;
    let collectionName;
    const matchValue = event.Collection;
    if (matchValue != null) {
        const name = matchValue;
        collectionName = name;
    }
    else {
        collectionName = toString(head(result.Collections)).toLocaleLowerCase();
    }
    let eventId;
    const matchValue_1 = [event.Id, event.ProgramId, event.ServiceName];
    if (matchValue_1[0] == null) {
        if (matchValue_1[1] == null) {
            eventId = "EMPTY";
        }
        else if (matchValue_1[2] != null) {
            const programId = matchValue_1[1];
            const serviceName_1 = matchValue_1[2];
            eventId = toText(printf("%s (%s)"))(programId)(serviceName_1);
        }
        else {
            const programId_1 = matchValue_1[1];
            const matchValue_2 = event.CarrierId;
            let pattern_matching_result, carrierId_1;
            if (matchValue_2 != null) {
                if (carrierId = matchValue_2, carrierId !== programId_1) {
                    pattern_matching_result = 0;
                    carrierId_1 = matchValue_2;
                }
                else {
                    pattern_matching_result = 1;
                }
            }
            else {
                pattern_matching_result = 1;
            }
            switch (pattern_matching_result) {
                case 0: {
                    const commonSubstring = getCommonSubstring(programId_1, carrierId_1);
                    const arg20_2 = substring(carrierId_1, commonSubstring.length);
                    eventId = toText(printf("%s (%s)"))(programId_1)(arg20_2);
                    break;
                }
                case 1: {
                    eventId = programId_1;
                    break;
                }
            }
        }
    }
    else {
        eventId = ((matchValue_1[2] != null) ? (id = matchValue_1[0], (serviceName = matchValue_1[2], toText(printf("%s (%s)"))(id)(serviceName))) : (id_1 = matchValue_1[0], id_1));
    }
    let description;
    const matchValue_3 = event.Description;
    if (matchValue_3 != null) {
        const text = matchValue_3;
        description = text;
    }
    else {
        description = "";
    }
    const date = (equals(result.SearchMode, new SearchMode(1)) ? true : (!equals_1(date_1(result.FromTime), date_1(result.ToTime)))) ? toString_1(event.Created, "yyyy-MM-dd") : "";
    return new EventRow(collectionName, eventId, description, date, toString_1(event.Created, "HH:mm:ss"));
}

