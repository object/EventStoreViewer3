import { Option, button } from "./.fable/Fulma.2.10.0/Elements/Button.fs.js";
import { mapIndexed, cons, map, contains, empty, singleton, ofArray } from "./.fable/fable-library.3.1.1/List.js";
import { div } from "./.fable/Fulma.2.10.0/Elements/Form/Control.fs.js";
import { TextAlignment_Option, TextWeight_Option, Text_span, TextSize_Option, Screen, Common_GenericOption, Modifier_IModifier, Color_IColor } from "./.fable/Fulma.2.10.0/Common.fs.js";
import { Option as Option_1, div as div_1 } from "./.fable/Fulma.2.10.0/Elements/Form/Field.fs.js";
import { Msg } from "./Messages.fs.js";
import { safeHash, equals } from "./.fable/fable-library.3.1.1/Util.js";
import { createResultRow, getCollectionDisplayName } from "./ViewUtils.fs.js";
import { Model__get_ContentAsString, Collections_all, ModelModule_isValid, ModelModule_hasValidToTime, ModelModule_hasValidFromTime, TimeZone, SearchInterval, SearchMode, ModelModule_hasValidId } from "./Model.fs.js";
import { IInputType, Option as Option_2, input } from "./.fable/Fulma.2.10.0/Elements/Form/Input.fs.js";
import { Browser_Types_Event__Event_get_Checked, Browser_Types_Event__Event_get_Value } from "./.fable/Fable.React.5.1.0/Fable.React.Extensions.fs.js";
import * as react from "react";
import { input as input_1, checkbox } from "./.fable/Fulma.2.10.0/Elements/Form/Checkbox.fs.js";
import { DOMAttr, HTMLAttr } from "./.fable/Fable.React.5.1.0/Fable.React.Props.fs.js";
import { printf, toText } from "./.fable/fable-library.3.1.1/String.js";
import { ISize, Option as Option_4, column } from "./.fable/Fulma.2.10.0/Layouts/Column.fs.js";
import { Option as Option_3, content } from "./.fable/Fulma.2.10.0/Elements/Content.fs.js";
import { TableOption, table } from "./.fable/Fulma.2.10.0/Elements/Table.fs.js";
import { columns as columns_1 } from "./.fable/Fulma.2.10.0/Layouts/Columns.fs.js";

export function showButton(name, color, disabled, msg, dispatch) {
    return button(ofArray([new Option(2), new Option(0, color), new Option(15, disabled), new Option(17, (_arg1) => {
        dispatch(msg);
    })]), singleton(name));
}

export function showSpace() {
    return div(empty(), empty());
}

export function showSearchModes(searchMode, dispatch) {
    const patternInput = (searchMode.tag === 0) ? [new Color_IColor(2), new Color_IColor(4)] : [new Color_IColor(4), new Color_IColor(2)];
    const programColor = patternInput[0];
    const intervalColor = patternInput[1];
    return div_1(singleton(new Option_1(4)), ofArray([showButton("Interval", intervalColor, false, new Msg(4), dispatch), showSpace(), showButton("Id", programColor, false, new Msg(3), dispatch)]));
}

export function showCollection(collection, model, dispatch) {
    const color = contains(collection, model.SelectedCollections, {
        Equals: equals,
        GetHashCode: safeHash,
    }) ? (new Color_IColor(4)) : (new Color_IColor(2));
    return button(ofArray([new Option(2), new Option(0, color), new Option(17, (_arg1) => {
        dispatch(new Msg(12, collection));
    })]), singleton(getCollectionDisplayName(collection)));
}

export function showIdInput(model, dispatch) {
    const inputColor = ModelModule_hasValidId(model) ? (new Color_IColor(6)) : (new Color_IColor(8));
    const textColor = equals(model.SearchMode, new SearchMode(1)) ? (new Color_IColor(0)) : (new Color_IColor(2));
    return div_1(empty(), singleton(div(empty(), singleton(input(ofArray([new Option_2(1, new IInputType(0)), new Option_2(2, inputColor), new Option_2(17, singleton(new Modifier_IModifier(1, textColor))), new Option_2(4, !equals(model.SearchMode, new SearchMode(1))), new Option_2(13, (evt) => {
        dispatch(new Msg(9, Browser_Types_Event__Event_get_Value(evt)));
    }), new Option_2(10, model.Id), new Option_2(12, "Id")]))))));
}

export function showSearchIntervals(intervals, modifiers, model, dispatch) {
    const getColor = (buttonInterval) => {
        if (model.SearchMode.tag === 0) {
            if (equals(model.SearchInterval, buttonInterval)) {
                return new Color_IColor(4);
            }
            else {
                return new Color_IColor(2);
            }
        }
        else {
            return new Color_IColor(2);
        }
    };
    const disabled = equals(model.SearchMode, new SearchMode(1));
    return div_1(ofArray([new Option_1(4), new Option_1(12, modifiers)]), ofArray([showButton(intervals[0], getColor(new SearchInterval(0)), disabled, new Msg(5), dispatch), showSpace(), showButton(intervals[1], getColor(new SearchInterval(1)), disabled, new Msg(6), dispatch), showSpace(), showButton(intervals[2], getColor(new SearchInterval(2)), disabled, new Msg(7), dispatch)]));
}

export function showIntervalTime(text, placeholderText, isValid, changeMsg, model, dispatch) {
    const inputColor = isValid(model) ? (new Color_IColor(6)) : (new Color_IColor(8));
    const textColor = (equals(model.SearchMode, new SearchMode(0)) ? equals(model.SearchInterval, new SearchInterval(3)) : false) ? (new Color_IColor(0)) : (new Color_IColor(2));
    return input(ofArray([new Option_2(1, new IInputType(0)), new Option_2(17, singleton(new Modifier_IModifier(1, textColor))), new Option_2(2, inputColor), new Option_2(4, (!equals(model.SearchMode, new SearchMode(0))) ? true : (!equals(model.SearchInterval, new SearchInterval(3)))), new Option_2(13, (evt) => {
        dispatch(changeMsg(Browser_Types_Event__Event_get_Value(evt)));
    }), new Option_2(10, text), new Option_2(12, placeholderText)]));
}

export function showTimezoneMode(model, dispatch) {
    return div(empty(), singleton(react.createElement("div", {
        style: {
            lineHeight: "36px",
        },
    }, checkbox(empty(), ofArray([input_1(singleton(new Common_GenericOption(1, ofArray([new HTMLAttr(39, !equals(model.SearchMode, new SearchMode(0))), new HTMLAttr(22, equals(model.TimeZone, new TimeZone(1))), new DOMAttr(9, (evt) => {
        dispatch(new Msg(13, Browser_Types_Event__Event_get_Checked(evt)));
    })])))), "Local"])))));
}

export function showCustomInterval(model, dispatch) {
    const getColor = (buttonInterval) => {
        if (model.SearchMode.tag === 0) {
            if (equals(model.SearchInterval, buttonInterval)) {
                return new Color_IColor(4);
            }
            else {
                return new Color_IColor(2);
            }
        }
        else {
            return new Color_IColor(2);
        }
    };
    const disabled = equals(model.SearchMode, new SearchMode(1));
    return div_1(ofArray([new Option_1(4), new Option_1(12, singleton(new Modifier_IModifier(22, new Screen(5), true)))]), ofArray([showButton("Custom interval", getColor(new SearchInterval(3)), disabled, new Msg(8), dispatch), showSpace(), showTimezoneMode(model, dispatch)]));
}

export function showIntervalRange(model, dispatch) {
    const timeMode = (model.TimeZone.tag === 1) ? "local" : "UTC";
    return div_1(ofArray([new Option_1(4), new Option_1(12, singleton(new Modifier_IModifier(22, new Screen(5), true)))]), ofArray([showIntervalTime(model.FromTime, toText(printf("from %s time"))(timeMode), ModelModule_hasValidFromTime, (arg0) => (new Msg(10, arg0)), model, dispatch), showSpace(), showIntervalTime(model.ToTime, toText(printf("to %s time"))(timeMode), ModelModule_hasValidToTime, (arg0_1) => (new Msg(11, arg0_1)), model, dispatch)]));
}

export function showSettings(model, dispatch) {
    return column(empty(), ofArray([showSearchModes(model.SearchMode, dispatch), showIdInput(model, dispatch), showSearchIntervals(["1 hour", "4 hours", "24 hours"], singleton(new Modifier_IModifier(22, new Screen(5), true)), model, dispatch), showSearchIntervals(["1h", "4h", "24h"], singleton(new Modifier_IModifier(22, new Screen(1), true)), model, dispatch), showCustomInterval(model, dispatch), showIntervalRange(model, dispatch)]));
}

export function showSearchButton(model, dispatch) {
    return column(empty(), singleton(button(ofArray([new Option(15, !ModelModule_isValid(model)), new Option(2), new Option(0, new Color_IColor(5)), new Option(17, (_arg1) => {
        dispatch(new Msg(16));
    })]), singleton("Search"))));
}

export function showCollections(model, dispatch) {
    return column(empty(), map((x) => div_1(empty(), singleton(showCollection(x.EventSource, model, dispatch))), Collections_all));
}

export function showStatus(model, dispatch) {
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
    return column(empty(), singleton(content(empty(), ofArray([react.createElement("h5", {}, toText(printf("Status: %s"))(status)), react.createElement("p", {}, text_2)]))));
}

export function showControls(model, dispatch) {
    return column(empty(), ofArray([showSettings(model, dispatch), showSearchButton(model, dispatch), showCollections(model, dispatch), showStatus(model, dispatch)]));
}

export function showResultRow(eventRow, i, isSmallScreen, model, dispatch) {
    let idx;
    let patternInput;
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
            patternInput = ["is-selected", new Msg(15)];
            break;
        }
        case 1: {
            patternInput = ["", new Msg(14, i)];
            break;
        }
    }
    const rowClassName = patternInput[0];
    const clickHandler = patternInput[1];
    const modifiers = ofArray([new Modifier_IModifier(3, new Screen(3), new TextSize_Option(5)), new Modifier_IModifier(3, new Screen(2), new TextSize_Option(6)), new Modifier_IModifier(3, new Screen(1), new TextSize_Option(6))]);
    const columns = ofArray([react.createElement("td", {
        hidden: isSmallScreen,
    }, Text_span(singleton(new Common_GenericOption(2, modifiers)), singleton(eventRow.CollectionName))), react.createElement("td", {}, Text_span(singleton(new Common_GenericOption(2, cons(new Modifier_IModifier(2, new TextWeight_Option(3)), modifiers))), singleton(eventRow.EventId))), react.createElement("td", {
        hidden: isSmallScreen,
    }, Text_span(singleton(new Common_GenericOption(2, modifiers)), singleton(eventRow.Description))), react.createElement("td", {}, Text_span(singleton(new Common_GenericOption(2, modifiers)), singleton(eventRow.Date))), react.createElement("td", {}, Text_span(singleton(new Common_GenericOption(2, modifiers)), singleton(eventRow.Time)))]);
    return react.createElement("tr", {
        className: rowClassName,
        onClick: (_arg1) => {
            dispatch(clickHandler);
        },
    }, ...columns);
}

export function showResultRows(isSmallScreen, model, dispatch) {
    const matchValue = model.SearchResult;
    if (matchValue == null) {
        return empty();
    }
    else {
        const result = matchValue;
        return mapIndexed((i, x) => {
            const eventRow = createResultRow(result, x, model);
            return showResultRow(eventRow, i, isSmallScreen, model, dispatch);
        }, result.Events);
    }
}

export function showResults(model, dispatch) {
    return column(empty(), singleton(div_1(empty(), singleton(react.createElement("div", {
        style: {
            overflowY: "auto",
            height: "96vh",
        },
    }, table(ofArray([new TableOption(3), new TableOption(4), new TableOption(7, singleton(new Modifier_IModifier(22, new Screen(5), true)))]), singleton(react.createElement("tbody", {}, ...showResultRows(false, model, dispatch)))), table(ofArray([new TableOption(3), new TableOption(4), new TableOption(7, singleton(new Modifier_IModifier(22, new Screen(1), true)))]), singleton(react.createElement("tbody", {}, ...showResultRows(true, model, dispatch)))))))));
}

export function showContent(model, dispatch) {
    const modifiers = ofArray([new Modifier_IModifier(5, new Screen(0), new TextAlignment_Option(2)), new Modifier_IModifier(0, new Color_IColor(2)), new Modifier_IModifier(1, new Color_IColor(9)), new Modifier_IModifier(3, new Screen(3), new TextSize_Option(5)), new Modifier_IModifier(3, new Screen(2), new TextSize_Option(6)), new Modifier_IModifier(3, new Screen(1), new TextSize_Option(6))]);
    return column(empty(), singleton(div_1(empty(), singleton(react.createElement("div", {
        style: {
            wordWrap: "break-word",
            overflowY: "auto",
            height: "96vh",
        },
    }, content(singleton(new Option_3(3, modifiers)), singleton(react.createElement("p", {}, Model__get_ContentAsString(model)))))))));
}

export function view(model, dispatch) {
    return columns_1(empty(), ofArray([column(ofArray([new Option_4(0, new Screen(3), new ISize(18)), new Option_4(0, new Screen(2), new ISize(1)), new Option_4(0, new Screen(1), new ISize(0))]), singleton(showControls(model, dispatch))), column(ofArray([new Option_4(0, new Screen(3), new ISize(18)), new Option_4(0, new Screen(2), new ISize(1)), new Option_4(0, new Screen(1), new ISize(0)), new Option_4(0, new Screen(4), new ISize(0))]), singleton(showResults(model, dispatch))), column(ofArray([new Option_4(0, new Screen(3), new ISize(18)), new Option_4(0, new Screen(2), new ISize(0)), new Option_4(0, new Screen(1), new ISize(2)), new Option_4(0, new Screen(4), new ISize(2))]), singleton(showContent(model, dispatch)))]));
}

