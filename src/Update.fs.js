import { toString, addHours, now as now_1 } from "./.fable/fable-library.3.1.1/Date.js";
import { SearchResult as SearchResult_1, Collections_all, Model, SearchStatus as SearchStatus_9, TimeZone as TimeZone_1, SearchInterval as SearchInterval_4, SearchMode as SearchMode_2, AppSettings } from "./Model.fs.js";
import { item, ofArray, length, singleton, cons, filter, contains, forAll, exists, empty } from "./.fable/fable-library.3.1.1/List.js";
import { Cmd_none, Cmd_OfFunc_result } from "./.fable/Fable.Elmish.3.0.0/cmd.fs.js";
import { Msg } from "./Messages.fs.js";
import { safeHash, equals } from "./.fable/fable-library.3.1.1/Util.js";
import { getAppSettings, loadContent, getContentUrl, startSearch, getSearchUrl, getRunningTime } from "./UpdateUtils.fs.js";
import { printf, toText } from "./.fable/fable-library.3.1.1/String.js";
import { value, map } from "./.fable/fable-library.3.1.1/Option.js";

export function init(_arg1) {
    let copyOfStruct;
    const now = now_1();
    const model = new Model(new AppSettings("", ""), new SearchMode_2(0), new SearchInterval_4(0), "", (copyOfStruct = addHours(now, -1), toString(copyOfStruct, "yyyy-MM-ddTHH:mm:ss")), toString(now, "yyyy-MM-ddTHH:mm:ss"), new TimeZone_1(1), empty(), new SearchStatus_9(0, ""), void 0, void 0, "");
    return [model, Cmd_OfFunc_result(new Msg(0))];
}

export function update(msg, model) {
    let arg20_1, arg10_1, arg10_2;
    const collectionHasCommonId = (collection) => exists((x) => {
        if (equals(x.EventSource, collection)) {
            return x.HasCommonId;
        }
        else {
            return false;
        }
    }, Collections_all);
    const collectionsHaveCommonId = (collections) => forAll(collectionHasCommonId, collections);
    const updateSelectedCollections = (collection_1) => {
        if (contains(collection_1, model.SelectedCollections, {
            Equals: equals,
            GetHashCode: safeHash,
        })) {
            return filter((x_2) => (!equals(x_2, collection_1)), model.SelectedCollections);
        }
        else {
            const matchValue = model.SearchMode;
            let pattern_matching_result;
            if (matchValue.tag === 1) {
                if (collectionHasCommonId(collection_1) ? collectionsHaveCommonId(model.SelectedCollections) : false) {
                    pattern_matching_result = 0;
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
                    return cons(collection_1, model.SelectedCollections);
                }
                case 1: {
                    if (matchValue.tag === 0) {
                        return singleton(collection_1);
                    }
                    else {
                        return singleton(collection_1);
                    }
                }
            }
        }
    };
    const getErrorMessage = (exn) => {
        const elapsed = getRunningTime(model);
        const arg20 = (~(~elapsed)) | 0;
        const arg10 = exn.message;
        return toText(printf("Error:\n%s\nLast request: %d ms"))(arg10)(arg20);
    };
    switch (msg.tag) {
        case 1: {
            const result = msg.fields[0];
            if (result.tag === 1) {
                const error = result.fields[0];
                return [new Model(model.AppSettings, model.SearchMode, model.SearchInterval, model.Id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, new SearchStatus_9(0, error), model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_none()];
            }
            else {
                const settings = result.fields[0];
                return [new Model(settings, model.SearchMode, model.SearchInterval, model.Id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, new SearchStatus_9(0, "Ready to execute requests"), model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_none()];
            }
        }
        case 2: {
            const exn_1 = msg.fields[0];
            return [new Model(model.AppSettings, model.SearchMode, model.SearchInterval, model.Id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, new SearchStatus_9(0, getErrorMessage(exn_1)), model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_none()];
        }
        case 3: {
            return [new Model(model.AppSettings, new SearchMode_2(1), model.SearchInterval, model.Id, model.FromTime, model.ToTime, model.TimeZone, (length(model.SelectedCollections) === 1) ? model.SelectedCollections : empty(), model.SearchStatus, model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_none()];
        }
        case 4: {
            return [new Model(model.AppSettings, new SearchMode_2(0), model.SearchInterval, model.Id, model.FromTime, model.ToTime, model.TimeZone, (length(model.SelectedCollections) === 1) ? model.SelectedCollections : empty(), model.SearchStatus, model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_none()];
        }
        case 9: {
            const id = msg.fields[0];
            return [new Model(model.AppSettings, model.SearchMode, model.SearchInterval, id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, model.SearchStatus, model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_none()];
        }
        case 5: {
            return [new Model(model.AppSettings, model.SearchMode, new SearchInterval_4(0), model.Id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, model.SearchStatus, model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_none()];
        }
        case 6: {
            return [new Model(model.AppSettings, model.SearchMode, new SearchInterval_4(1), model.Id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, model.SearchStatus, model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_none()];
        }
        case 7: {
            return [new Model(model.AppSettings, model.SearchMode, new SearchInterval_4(2), model.Id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, model.SearchStatus, model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_none()];
        }
        case 8: {
            return [new Model(model.AppSettings, model.SearchMode, new SearchInterval_4(3), model.Id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, model.SearchStatus, model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_none()];
        }
        case 10: {
            const time = msg.fields[0];
            return [new Model(model.AppSettings, model.SearchMode, model.SearchInterval, model.Id, time, model.ToTime, model.TimeZone, model.SelectedCollections, model.SearchStatus, model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_none()];
        }
        case 11: {
            const time_1 = msg.fields[0];
            return [new Model(model.AppSettings, model.SearchMode, model.SearchInterval, model.Id, model.FromTime, time_1, model.TimeZone, model.SelectedCollections, model.SearchStatus, model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_none()];
        }
        case 12: {
            const collection_2 = msg.fields[0];
            return [new Model(model.AppSettings, model.SearchMode, model.SearchInterval, model.Id, model.FromTime, model.ToTime, model.TimeZone, updateSelectedCollections(collection_2), model.SearchStatus, model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_none()];
        }
        case 13: {
            const isLocal = msg.fields[0];
            return [new Model(model.AppSettings, model.SearchMode, model.SearchInterval, model.Id, model.FromTime, model.ToTime, isLocal ? (new TimeZone_1(1)) : (new TimeZone_1(0)), model.SelectedCollections, model.SearchStatus, model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_none()];
        }
        case 16: {
            const fetchUrl = getSearchUrl(model);
            return startSearch(model, fetchUrl, (arg0_3) => (new Msg(17, arg0_3)), (arg0_4) => (new Msg(18, arg0_4)));
        }
        case 17: {
            const result_1 = msg.fields[0];
            if (result_1.tag === 1) {
                const error_1 = result_1.fields[0];
                return [new Model(model.AppSettings, model.SearchMode, model.SearchInterval, model.Id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, new SearchStatus_9(0, error_1), model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_none()];
            }
            else {
                const events = result_1.fields[0];
                const elapsed_1 = getRunningTime(model);
                return [new Model(model.AppSettings, model.SearchMode, model.SearchInterval, model.Id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, new SearchStatus_9(0, (arg20_1 = (events.length | 0), (arg10_1 = ((~(~elapsed_1)) | 0), toText(printf("Last search: %d ms (%d results)"))(arg10_1)(arg20_1)))), map((x_3) => (new SearchResult_1(x_3.SearchMode, x_3.Collections, x_3.FromTime, x_3.ToTime, ofArray(events))), model.SearchResult), model.SelectedEventIndex, model.Content), Cmd_none()];
            }
        }
        case 18: {
            const exn_2 = msg.fields[0];
            return [new Model(model.AppSettings, model.SearchMode, model.SearchInterval, model.Id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, new SearchStatus_9(0, getErrorMessage(exn_2)), model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_none()];
        }
        case 14: {
            const index = msg.fields[0] | 0;
            return [new Model(model.AppSettings, model.SearchMode, model.SearchInterval, model.Id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, model.SearchStatus, model.SearchResult, index, model.Content), Cmd_OfFunc_result(new Msg(19, index))];
        }
        case 15: {
            return [new Model(model.AppSettings, model.SearchMode, model.SearchInterval, model.Id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, model.SearchStatus, model.SearchResult, void 0, ""), Cmd_none()];
        }
        case 19: {
            const index_1 = msg.fields[0] | 0;
            const fetchUrl_1 = getContentUrl(model, item(index_1, value(model.SearchResult).Events));
            return loadContent(model, fetchUrl_1, (arg0_7) => (new Msg(20, arg0_7)), (arg0_8) => (new Msg(21, arg0_8)));
        }
        case 20: {
            const result_2 = msg.fields[0];
            if (result_2.tag === 1) {
                const error_2 = result_2.fields[0];
                return [new Model(model.AppSettings, model.SearchMode, model.SearchInterval, model.Id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, new SearchStatus_9(0, error_2), model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_none()];
            }
            else {
                const eventContent = result_2.fields[0];
                const elapsed_2 = getRunningTime(model);
                return [new Model(model.AppSettings, model.SearchMode, model.SearchInterval, model.Id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, new SearchStatus_9(0, (arg10_2 = ((~(~elapsed_2)) | 0), toText(printf("Last search: %d ms"))(arg10_2))), model.SearchResult, model.SelectedEventIndex, eventContent.Content), Cmd_none()];
            }
        }
        case 21: {
            const exn_3 = msg.fields[0];
            return [new Model(model.AppSettings, model.SearchMode, model.SearchInterval, model.Id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, new SearchStatus_9(0, getErrorMessage(exn_3)), model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_none()];
        }
        default: {
            return getAppSettings(model, (arg0) => (new Msg(1, arg0)), (arg0_1) => (new Msg(2, arg0_1)));
        }
    }
}

