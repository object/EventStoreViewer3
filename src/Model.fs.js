import { FSharpRef, toString, Record, Union } from "./.fable/fable-library.3.1.1/Types.js";
import { int32_type, list_type, obj_type, option_type, class_type, string_type, record_type, bool_type, union_type } from "./.fable/fable-library.3.1.1/Reflection.js";
import { length, ofArray } from "./.fable/fable-library.3.1.1/List.js";
import { isNullOrWhiteSpace, trim, trimStart } from "./.fable/fable-library.3.1.1/String.js";
import { parse, compare, tryParse, minValue } from "./.fable/fable-library.3.1.1/Date.js";

export class EventSource extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Omnibus", "Radioarkiv", "Subtitles", "Potion", "FailedMessages"];
    }
}

export function EventSource$reflection() {
    return union_type("EventStoreViewer.Model.EventSource", [], EventSource, () => [[], [], [], [], []]);
}

export class EventCollection extends Record {
    constructor(EventSource, HasCommonId) {
        super();
        this.EventSource = EventSource;
        this.HasCommonId = HasCommonId;
    }
}

export function EventCollection$reflection() {
    return record_type("EventStoreViewer.Model.EventCollection", [], EventCollection, () => [["EventSource", EventSource$reflection()], ["HasCommonId", bool_type]]);
}

export const Collections_all = ofArray([new EventCollection(new EventSource(0), true), new EventCollection(new EventSource(1), true), new EventCollection(new EventSource(2), true), new EventCollection(new EventSource(3), false), new EventCollection(new EventSource(4), false)]);

export class SearchMode extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["ByInterval", "ById"];
    }
}

export function SearchMode$reflection() {
    return union_type("EventStoreViewer.Model.SearchMode", [], SearchMode, () => [[], []]);
}

export class SearchInterval extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["OneHour", "FourHours", "OneDay", "Custom"];
    }
}

export function SearchInterval$reflection() {
    return union_type("EventStoreViewer.Model.SearchInterval", [], SearchInterval, () => [[], [], [], []]);
}

export class SearchStatus extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Idle", "Running"];
    }
}

export function SearchStatus$reflection() {
    return union_type("EventStoreViewer.Model.SearchStatus", [], SearchStatus, () => [[["Item", string_type]], [["Item1", string_type], ["Item2", class_type("System.DateTime")]]]);
}

export class TimeZone extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Utc", "Local"];
    }
}

export function TimeZone$reflection() {
    return union_type("EventStoreViewer.Model.TimeZone", [], TimeZone, () => [[], []]);
}

export class ServiceEvent extends Record {
    constructor(Collection, Id, ProgramId, CarrierId, ServiceName, Description, Created, IdPartitionKey, DatePartitionKey, RowKey) {
        super();
        this.Collection = Collection;
        this.Id = Id;
        this.ProgramId = ProgramId;
        this.CarrierId = CarrierId;
        this.ServiceName = ServiceName;
        this.Description = Description;
        this.Created = Created;
        this.IdPartitionKey = IdPartitionKey;
        this.DatePartitionKey = DatePartitionKey;
        this.RowKey = RowKey;
    }
}

export function ServiceEvent$reflection() {
    return record_type("EventStoreViewer.Model.ServiceEvent", [], ServiceEvent, () => [["Collection", option_type(string_type)], ["Id", option_type(string_type)], ["ProgramId", option_type(string_type)], ["CarrierId", option_type(string_type)], ["ServiceName", option_type(string_type)], ["Description", option_type(string_type)], ["Created", class_type("System.DateTime")], ["IdPartitionKey", string_type], ["DatePartitionKey", string_type], ["RowKey", string_type]]);
}

export class EventContent extends Record {
    constructor(Content) {
        super();
        this.Content = Content;
    }
}

export function EventContent$reflection() {
    return record_type("EventStoreViewer.Model.EventContent", [], EventContent, () => [["Content", obj_type]]);
}

export class ContentType extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["None", "Json", "Xml"];
    }
}

export function ContentType$reflection() {
    return union_type("EventStoreViewer.Model.ContentType", [], ContentType, () => [[], [], []]);
}

export class SearchResult extends Record {
    constructor(SearchMode, Collections, FromTime, ToTime, Events) {
        super();
        this.SearchMode = SearchMode;
        this.Collections = Collections;
        this.FromTime = FromTime;
        this.ToTime = ToTime;
        this.Events = Events;
    }
}

export function SearchResult$reflection() {
    return record_type("EventStoreViewer.Model.SearchResult", [], SearchResult, () => [["SearchMode", SearchMode$reflection()], ["Collections", list_type(EventSource$reflection())], ["FromTime", class_type("System.DateTime")], ["ToTime", class_type("System.DateTime")], ["Events", list_type(ServiceEvent$reflection())]]);
}

export class AppSettings extends Record {
    constructor(apiUrl, authorizationKey) {
        super();
        this.apiUrl = apiUrl;
        this.authorizationKey = authorizationKey;
    }
}

export function AppSettings$reflection() {
    return record_type("EventStoreViewer.Model.AppSettings", [], AppSettings, () => [["apiUrl", string_type], ["authorizationKey", string_type]]);
}

export class Model extends Record {
    constructor(AppSettings, SearchMode, SearchInterval, Id, FromTime, ToTime, TimeZone, SelectedCollections, SearchStatus, SearchResult, SelectedEventIndex, Content) {
        super();
        this.AppSettings = AppSettings;
        this.SearchMode = SearchMode;
        this.SearchInterval = SearchInterval;
        this.Id = Id;
        this.FromTime = FromTime;
        this.ToTime = ToTime;
        this.TimeZone = TimeZone;
        this.SelectedCollections = SelectedCollections;
        this.SearchStatus = SearchStatus;
        this.SearchResult = SearchResult;
        this.SelectedEventIndex = SelectedEventIndex;
        this.Content = Content;
    }
}

export function Model$reflection() {
    return record_type("EventStoreViewer.Model.Model", [], Model, () => [["AppSettings", AppSettings$reflection()], ["SearchMode", SearchMode$reflection()], ["SearchInterval", SearchInterval$reflection()], ["Id", string_type], ["FromTime", string_type], ["ToTime", string_type], ["TimeZone", TimeZone$reflection()], ["SelectedCollections", list_type(EventSource$reflection())], ["SearchStatus", SearchStatus$reflection()], ["SearchResult", option_type(SearchResult$reflection())], ["SelectedEventIndex", option_type(int32_type)], ["Content", obj_type]]);
}

export function Model__get_ContentType(this$) {
    if (this$.Content == null) {
        return new ContentType(0);
    }
    else {
        const text = toString(this$.Content);
        if (text === "") {
            return new ContentType(0);
        }
        else if (trimStart(text).indexOf("\u003c") === 0) {
            return new ContentType(2);
        }
        else {
            return new ContentType(1);
        }
    }
}

export function Model__get_ContentAsString(this$) {
    const matchValue = Model__get_ContentType(this$);
    switch (matchValue.tag) {
        case 1: {
            return trim(JSON.stringify(this$.Content), "\"");
        }
        case 2: {
            return toString(this$.Content);
        }
        default: {
            return "";
        }
    }
}

function ModelModule_isValidTime(s) {
    let outArg;
    if (isNullOrWhiteSpace(s)) {
        return false;
    }
    else {
        const result = (outArg = minValue(), [tryParse(s, new FSharpRef(() => outArg, (v) => {
            outArg = v;
        })), outArg])[0];
        return result;
    }
}

export function ModelModule_hasValidId(model) {
    return !isNullOrWhiteSpace(model.Id);
}

export function ModelModule_hasValidFromTime(model) {
    return ModelModule_isValidTime(model.FromTime);
}

export function ModelModule_hasValidToTime(model) {
    return ModelModule_isValidTime(model.ToTime);
}

export function ModelModule_hasValidInterval(model) {
    if (ModelModule_isValidTime(model.FromTime) ? ModelModule_isValidTime(model.ToTime) : false) {
        return compare(parse(model.ToTime), parse(model.FromTime)) > 0;
    }
    else {
        return false;
    }
}

export function ModelModule_isValid(model) {
    if (model.SearchMode.tag === 0) {
        if (ModelModule_hasValidInterval(model)) {
            return length(model.SelectedCollections) === 1;
        }
        else {
            return false;
        }
    }
    else if (ModelModule_hasValidId(model)) {
        return length(model.SelectedCollections) >= 1;
    }
    else {
        return false;
    }
}

