import { minValue, toString as toString_1, parse, addDays, addHours, isDaylightSavingTime, now as now_1, op_Subtraction } from "./.fable/fable-library.3.1.1/Date.js";
import { fromTicks } from "./.fable/fable-library.3.1.1/TimeSpan.js";
import { fromBits } from "./.fable/fable-library.3.1.1/Long.js";
import { toString } from "./.fable/fable-library.3.1.1/Types.js";
import { uncurry, int32ToString } from "./.fable/fable-library.3.1.1/Util.js";
import { keyValueList } from "./.fable/fable-library.3.1.1/MapUtil.js";
import { FSharpResult$2 } from "./.fable/fable-library.3.1.1/Choice.js";
import { Auto_generateDecoderCached_7848D058, fromString } from "./.fable/Thoth.Json.4.0.0/Decode.fs.js";
import { substring, join, printf, toText } from "./.fable/fable-library.3.1.1/String.js";
import { EventContent$reflection, SearchResult as SearchResult_1, ServiceEvent$reflection, Model, SearchStatus as SearchStatus_1, AppSettings$reflection } from "./Model.fs.js";
import { map, head, empty } from "./.fable/fable-library.3.1.1/List.js";
import { Cmd_OfPromise_either } from "./.fable/Fable.Elmish.3.0.0/cmd.fs.js";
import { array_type } from "./.fable/fable-library.3.1.1/Reflection.js";

export function getRunningTime(model) {
    const matchValue = model.SearchStatus;
    if (matchValue.tag === 1) {
        const startTime = matchValue.fields[1];
        return op_Subtraction(now_1(), startTime);
    }
    else {
        return fromTicks(fromBits(0, 0, false));
    }
}

function getCollectionTableName(col) {
    return toString(col).toLocaleLowerCase();
}

function errorString(response) {
    return (((int32ToString(response.status) + " ") + (response.statusText)) + " for URL ") + (response.url);
}

function fetchWithDecoder(url, decoder, init) {
    const pr_1 = fetch(url, keyValueList(init, 1));
    return pr_1.then(((response) => {
        if (!(response.ok)) {
            const a = new FSharpResult$2(1, errorString(response));
            return Promise.resolve(a);
        }
        else {
            const pr = response.text();
            let a_1;
            const decoder_1 = decoder;
            a_1 = ((value) => fromString(decoder_1, value));
            return pr.then(a_1);
        }
    }));
}

function getSearchByIdUrl(host, collectionNames, id) {
    return toText(printf("%s/queryById/v1/%s/%s?noContent=true"))(host)(collectionNames)(id);
}

function getSearchByIntervalUrl(host, collectionName, fromTime, toTime) {
    return toText(printf("%s/queryByTime/v1/%s/%s/%s?noContent=true"))(host)(collectionName)(fromTime)(toTime);
}

function getLoadContentUrl(host, collectionName, partitionKey, rowKey) {
    return toText(printf("%s/getByKey/v1/%s/%s/%s"))(host)(collectionName)(partitionKey)(rowKey);
}

export function getAppSettings(model, onCompleted, onError) {
    const fetchSettings = () => {
        const decoder = Auto_generateDecoderCached_7848D058(void 0, void 0, {
            ResolveType: AppSettings$reflection,
        });
        return fetchWithDecoder("appSettings.json", uncurry(2, decoder), empty());
    };
    return [new Model(model.AppSettings, model.SearchMode, model.SearchInterval, model.Id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, new SearchStatus_1(1, "Loading appSettings.json", now_1()), model.SearchResult, model.SelectedEventIndex, model.Content), Cmd_OfPromise_either(fetchSettings, void 0, onCompleted, onError)];
}

export function getSearchUrl(model) {
    let copyOfStruct;
    const offset = ((copyOfStruct = now_1(), isDaylightSavingTime(copyOfStruct)) ? 2 : 1) | 0;
    const getLocalTime = (time) => addHours(time, -offset);
    if (model.SearchMode.tag === 0) {
        const collectionName = getCollectionTableName(head(model.SelectedCollections));
        const now = now_1();
        let patternInput;
        let tupledArg_1;
        let tupledArg;
        const matchValue_1 = model.SearchInterval;
        switch (matchValue_1.tag) {
            case 1: {
                tupledArg = [addHours(now, -4), now];
                break;
            }
            case 2: {
                tupledArg = [addDays(now, -1), now];
                break;
            }
            case 3: {
                tupledArg = [parse(model.FromTime), parse(model.ToTime)];
                break;
            }
            default: {
                tupledArg = [addHours(now, -1), now];
            }
        }
        const fromTime = tupledArg[0];
        const toTime = tupledArg[1];
        tupledArg_1 = ((model.TimeZone.tag === 1) ? [getLocalTime(fromTime), getLocalTime(toTime)] : [fromTime, toTime]);
        const fromTime_1 = tupledArg_1[0];
        const toTime_1 = tupledArg_1[1];
        patternInput = [toString_1(fromTime_1, "yyyy-MM-ddTHH:mm:ss"), toString_1(toTime_1, "yyyy-MM-ddTHH:mm:ss")];
        const toTime_2 = patternInput[1];
        const fromTime_2 = patternInput[0];
        return getSearchByIntervalUrl(model.AppSettings.apiUrl, collectionName, fromTime_2, toTime_2);
    }
    else {
        const collectionNames = join(",", map(getCollectionTableName, model.SelectedCollections));
        return getSearchByIdUrl(model.AppSettings.apiUrl, collectionNames, model.Id.trim());
    }
}

export function getContentUrl(model, serviceEvent) {
    let collectionName;
    const matchValue = serviceEvent.Collection;
    if (matchValue == null) {
        collectionName = getCollectionTableName(head(model.SelectedCollections));
    }
    else {
        const collection = matchValue;
        collectionName = collection;
    }
    return getLoadContentUrl(model.AppSettings.apiUrl, collectionName, serviceEvent.IdPartitionKey, serviceEvent.RowKey);
}

export function startSearch(model, fetchUrl, onCompleted, onError) {
    const authorizedFetchUrl = toText(printf("%s\u0026code=%s"))(fetchUrl)(model.AppSettings.authorizationKey);
    const fetchEvents = () => {
        const decoder = Auto_generateDecoderCached_7848D058(void 0, void 0, {
            ResolveType: () => array_type(ServiceEvent$reflection()),
        });
        return fetchWithDecoder(authorizedFetchUrl, uncurry(2, decoder), empty());
    };
    let statusMessage;
    const arg20_1 = substring(fetchUrl, model.AppSettings.apiUrl.length);
    statusMessage = toText(printf("Retrieving results from\n%s\n%s"))(model.AppSettings.apiUrl)(arg20_1);
    const patternInput = (model.SearchMode.tag === 0) ? [parse(model.FromTime), parse(model.ToTime)] : [minValue(), minValue()];
    const toTime = patternInput[1];
    const fromTime = patternInput[0];
    return [new Model(model.AppSettings, model.SearchMode, model.SearchInterval, model.Id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, new SearchStatus_1(1, statusMessage, now_1()), new SearchResult_1(model.SearchMode, model.SelectedCollections, fromTime, toTime, empty()), void 0, ""), Cmd_OfPromise_either(fetchEvents, void 0, onCompleted, onError)];
}

export function loadContent(model, fetchUrl, onCompleted, onError) {
    const authorizedFetchUrl = toText(printf("%s?code=%s"))(fetchUrl)(model.AppSettings.authorizationKey);
    const fetchContent = () => {
        const decoder = Auto_generateDecoderCached_7848D058(void 0, void 0, {
            ResolveType: EventContent$reflection,
        });
        return fetchWithDecoder(authorizedFetchUrl, uncurry(2, decoder), empty());
    };
    let statusMessage;
    const arg20_1 = substring(fetchUrl, model.AppSettings.apiUrl.length);
    statusMessage = toText(printf("Retrieving content from\n%s\n%s"))(model.AppSettings.authorizationKey)(arg20_1);
    return [new Model(model.AppSettings, model.SearchMode, model.SearchInterval, model.Id, model.FromTime, model.ToTime, model.TimeZone, model.SelectedCollections, new SearchStatus_1(1, statusMessage, now_1()), model.SearchResult, model.SelectedEventIndex, ""), Cmd_OfPromise_either(fetchContent, void 0, onCompleted, onError)];
}

