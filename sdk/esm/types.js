import { DatastarDatalineAttributes, DatastarDatalineAutoRemove, DatastarDatalineFragments, DatastarDatalineMergeMode, DatastarDatalineOnlyIfMissing, DatastarDatalinePaths, DatastarDatalineScript, DatastarDatalineSelector, DatastarDatalineSettleDuration, DatastarDatalineSignals, DatastarDatalineUseViewTransition, DefaultExecuteScriptAttributes, DefaultExecuteScriptAutoRemove, DefaultFragmentMergeMode, DefaultFragmentsSettleDurationMs, DefaultFragmentsUseViewTransitions, DefaultMergeSignalsOnlyIfMissing, } from "./consts.js";
export const sseHeaders = {
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "text/event-stream",
};
export const DefaultMapping = {
    [DatastarDatalineMergeMode]: DefaultFragmentMergeMode,
    [DatastarDatalineSettleDuration]: DefaultFragmentsSettleDurationMs,
    [DatastarDatalineUseViewTransition]: DefaultFragmentsUseViewTransitions,
    [DatastarDatalineOnlyIfMissing]: DefaultMergeSignalsOnlyIfMissing,
    [DatastarDatalineAttributes]: {
        [DefaultExecuteScriptAttributes.split(" ")[0]]: DefaultExecuteScriptAttributes.split(" ")[1],
    },
    [DatastarDatalineAutoRemove]: DefaultExecuteScriptAutoRemove,
};
