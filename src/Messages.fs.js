import { Union } from "./.fable/fable-library.3.1.1/Types.js";
import { EventContent$reflection, ServiceEvent$reflection, EventSource$reflection, AppSettings$reflection } from "./Model.fs.js";
import { array_type, int32_type, bool_type, class_type, union_type, string_type } from "./.fable/fable-library.3.1.1/Reflection.js";
import { FSharpResult$2 } from "./.fable/fable-library.3.1.1/Choice.js";

export class Msg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["LoadAppSettings", "AppSettingsLoaded", "AppSettingsError", "SearchModeById", "SearchModeByInterval", "SearchIntervalOneHour", "SearchIntervalFourHours", "SearchIntervalOneDay", "SearchIntervalCustom", "ProgramIdChanged", "FromTimeChanged", "ToTimeChanged", "CollectionChanged", "TimeZoneChanged", "EventSelected", "EventUnselected", "StartSearch", "SearchCompleted", "SearchError", "LoadContent", "ContentLoaded", "LoadError"];
    }
}

export function Msg$reflection() {
    return union_type("EventStoreViewer.Messages.Msg", [], Msg, () => [[], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [AppSettings$reflection(), string_type], FSharpResult$2, () => [[["ResultValue", AppSettings$reflection()]], [["ErrorValue", string_type]]])]], [["Item", class_type("System.Exception")]], [], [], [], [], [], [], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", EventSource$reflection()]], [["Item", bool_type]], [["Item", int32_type]], [], [], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [array_type(ServiceEvent$reflection()), string_type], FSharpResult$2, () => [[["ResultValue", array_type(ServiceEvent$reflection())]], [["ErrorValue", string_type]]])]], [["Item", class_type("System.Exception")]], [["Item", int32_type]], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [EventContent$reflection(), string_type], FSharpResult$2, () => [[["ResultValue", EventContent$reflection()]], [["ErrorValue", string_type]]])]], [["Item", class_type("System.Exception")]]]);
}

