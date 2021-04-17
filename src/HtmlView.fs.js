import * as react from "react";
import { Msg } from "./Messages.fs.js";
import { createResultRow, getCollectionDisplayName } from "./ViewUtils.fs.js";
import { equals } from "./.fable/fable-library.3.1.1/Util.js";
import { Model__get_ContentAsString, Collections_all, ModelModule_isValid, TimeZone, SearchInterval, SearchMode } from "./Model.fs.js";
import { Browser_Types_Event__Event_get_Checked, Browser_Types_Event__Event_get_Value } from "./.fable/Fable.React.5.1.0/Fable.React.Extensions.fs.js";
import { mapIndexed, empty, ofArray, map } from "./.fable/fable-library.3.1.1/List.js";
import { printf, toText } from "./.fable/fable-library.3.1.1/String.js";

export function showButton(name, disabled, msg, dispatch) {
    return react.createElement("button", {
        disabled: disabled,
        onClick: (_arg1) => {
            dispatch(msg);
        },
    }, name);
}

export function showSpace() {
    return react.createElement("div", {
        className: "control",
    });
}

export function showSearchModes(dispatch) {
    return react.createElement("div", {}, showButton("Interval", false, new Msg(4), dispatch), showSpace(), showButton("Id", false, new Msg(3), dispatch));
}

export function showCollection(collection, dispatch) {
    return react.createElement("button", {
        onClick: (_arg1) => {
            dispatch(new Msg(12, collection));
        },
    }, getCollectionDisplayName(collection));
}

export function showIdInput(model, dispatch) {
    return react.createElement("div", {}, react.createElement("div", {
        className: "control",
    }, react.createElement("input", {
        disabled: !equals(model.SearchMode, new SearchMode(1)),
        onChange: (evt) => {
            dispatch(new Msg(9, Browser_Types_Event__Event_get_Value(evt)));
        },
    })));
}

export function showSearchIntervals(intervals, model, dispatch) {
    const disabled = equals(model.SearchMode, new SearchMode(1));
    return react.createElement("div", {}, showButton(intervals[0], disabled, new Msg(5), dispatch), showSpace(), showButton(intervals[1], disabled, new Msg(6), dispatch), showSpace(), showButton(intervals[2], disabled, new Msg(7), dispatch));
}

export function showIntervalTime(changeMsg, model, dispatch) {
    return react.createElement("input", {
        disabled: (!equals(model.SearchMode, new SearchMode(0))) ? true : (!equals(model.SearchInterval, new SearchInterval(3))),
        onChange: (evt) => {
            dispatch(changeMsg(Browser_Types_Event__Event_get_Value(evt)));
        },
    });
}

export function showTimezoneMode(model, dispatch) {
    return react.createElement("div", {}, react.createElement("input", {
        type: "checkbox",
        disabled: !equals(model.SearchMode, new SearchMode(0)),
        checked: equals(model.TimeZone, new TimeZone(1)),
        onChange: (evt) => {
            dispatch(new Msg(13, Browser_Types_Event__Event_get_Checked(evt)));
        },
    }), react.createElement("label", {}, "Local"));
}

export function showCustomInterval(model, dispatch) {
    const disabled = equals(model.SearchMode, new SearchMode(1));
    return react.createElement("div", {}, showButton("Custom interval", disabled, new Msg(8), dispatch), showSpace(), showTimezoneMode(model, dispatch));
}

export function showIntervalRange(model, dispatch) {
    return react.createElement("div", {}, showIntervalTime((arg0) => (new Msg(10, arg0)), model, dispatch), showSpace(), showIntervalTime((arg0_1) => (new Msg(11, arg0_1)), model, dispatch));
}

export function showSettings(model, dispatch) {
    return react.createElement("div", {}, showSearchModes(dispatch), showIdInput(model, dispatch), showSearchIntervals(["1 hour", "4 hours", "24 hours"], model, dispatch), showCustomInterval(model, dispatch), showIntervalRange(model, dispatch));
}

export function showSearchButton(model, dispatch) {
    return react.createElement("div", {}, react.createElement("button", {
        disabled: !ModelModule_isValid(model),
        onClick: (_arg1) => {
            dispatch(new Msg(16));
        },
    }, "Search"));
}

export function showCollections(model, dispatch) {
    return react.createElement("div", {}, ...map((x) => react.createElement("div", {}, showCollection(x.EventSource, dispatch)), Collections_all));
}

export function showStatus(model, _dispatch) {
    let patternInput;
    const matchValue = model.SearchStatus;
    if (matchValue.tag === 1) {
        const text_1 = matchValue.fields[0];
        patternInput = ["Running", text_1];
    }
    else {
        const text = matchValue.fields[0];
        patternInput = ["Idle", text];
    }
    const text_2 = patternInput[1];
    const status = patternInput[0];
    return react.createElement("div", {}, react.createElement("div", {}, react.createElement("p", {}, toText(printf("Status: %s"))(status)), react.createElement("p", {}, text_2)));
}

export function showControls(model, dispatch) {
    return react.createElement("div", {}, showSettings(model, dispatch), showSearchButton(model, dispatch), showCollections(model, dispatch), showStatus(model, dispatch));
}

export function showResultRow(eventRow, i, model, dispatch) {
    let idx;
    let clickHandler;
    const matchValue = model.SelectedEventIndex;
    let pattern_matching_result;
    if (matchValue != null) {
        if (idx = (matchValue | 0), idx === i) {
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
            clickHandler = (new Msg(15));
            break;
        }
        case 1: {
            clickHandler = (new Msg(14, i));
            break;
        }
    }
    const columns = ofArray([react.createElement("td", {}, react.createElement("span", {}, eventRow.CollectionName)), react.createElement("td", {}, react.createElement("span", {}, eventRow.EventId)), react.createElement("td", {}, react.createElement("span", {}, eventRow.Description)), react.createElement("td", {}, react.createElement("span", {}, eventRow.Date)), react.createElement("td", {}, react.createElement("span", {}, eventRow.Time))]);
    return react.createElement("tr", {
        onClick: (_arg1) => {
            dispatch(clickHandler);
        },
    }, ...columns);
}

export function showResultRows(model, dispatch) {
    const matchValue = model.SearchResult;
    if (matchValue == null) {
        return empty();
    }
    else {
        const result = matchValue;
        return mapIndexed((i, x) => {
            const eventRow = createResultRow(result, x, model);
            return showResultRow(eventRow, i, model, dispatch);
        }, result.Events);
    }
}

export function showResults(model, dispatch) {
    return react.createElement("div", {}, react.createElement("table", {}, react.createElement("tbody", {}, ...showResultRows(model, dispatch))));
}

export function showContent(model, _dispatch) {
    return react.createElement("div", {}, react.createElement("p", {}, Model__get_ContentAsString(model)));
}

export function view(model, dispatch) {
    return react.createElement("div", {}, showControls(model, dispatch), showResults(model, dispatch), showContent(model, dispatch));
}

