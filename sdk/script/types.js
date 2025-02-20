"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMapping = exports.sseHeaders = void 0;
const consts_js_1 = require("./consts.js");
exports.sseHeaders = {
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "text/event-stream",
};
exports.DefaultMapping = {
    [consts_js_1.DatastarDatalineMergeMode]: consts_js_1.DefaultFragmentMergeMode,
    [consts_js_1.DatastarDatalineSettleDuration]: consts_js_1.DefaultFragmentsSettleDurationMs,
    [consts_js_1.DatastarDatalineUseViewTransition]: consts_js_1.DefaultFragmentsUseViewTransitions,
    [consts_js_1.DatastarDatalineOnlyIfMissing]: consts_js_1.DefaultMergeSignalsOnlyIfMissing,
    [consts_js_1.DatastarDatalineAttributes]: {
        [consts_js_1.DefaultExecuteScriptAttributes.split(" ")[0]]: consts_js_1.DefaultExecuteScriptAttributes.split(" ")[1],
    },
    [consts_js_1.DatastarDatalineAutoRemove]: consts_js_1.DefaultExecuteScriptAutoRemove,
};
