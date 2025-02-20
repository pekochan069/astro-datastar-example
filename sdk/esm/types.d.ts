import {
  DatastarDatalineAttributes,
  DatastarDatalineAutoRemove,
  DatastarDatalineFragments,
  DatastarDatalineMergeMode,
  DatastarDatalineOnlyIfMissing,
  DatastarDatalinePaths,
  DatastarDatalineScript,
  DatastarDatalineSelector,
  DatastarDatalineSettleDuration,
  DatastarDatalineSignals,
  DatastarDatalineUseViewTransition,
  EventTypes,
  FragmentMergeModes,
} from "../src/consts.js";
import type { Jsonifiable } from "type-fest";
export type FragmentMergeMode = (typeof FragmentMergeModes)[number];
export type EventType = (typeof EventTypes)[number];
export interface DatastarEventOptions {
  eventId?: string;
  retryDuration?: number;
}
export interface FragmentOptions extends DatastarEventOptions {
  [DatastarDatalineUseViewTransition]?: boolean;
  [DatastarDatalineSettleDuration]?: number;
}
export interface MergeFragmentsOptions extends FragmentOptions {
  [DatastarDatalineMergeMode]?: FragmentMergeMode;
  [DatastarDatalineSelector]?: string;
}
export interface MergeFragmentsEvent {
  event: "datastar-merge-fragments";
  options: MergeFragmentsOptions;
  [DatastarDatalineFragments]: string;
}
export interface RemoveFragmentsEvent {
  event: "datastar-remove-fragments";
  options: FragmentOptions;
  [DatastarDatalineSelector]: string;
}
export interface MergeSignalsOptions extends DatastarEventOptions {
  [DatastarDatalineOnlyIfMissing]?: boolean;
}
export interface MergeSignalsEvent {
  event: "datastar-merge-signals";
  options: MergeSignalsOptions;
  [DatastarDatalineSignals]: Record<string, Jsonifiable>;
}
export interface RemoveSignalsEvent {
  event: "datastar-remove-signals";
  options: DatastarEventOptions;
  [DatastarDatalinePaths]: string[];
}
type ScriptAttributes = {
  type?: "module" | "importmap" | "speculationrules" | "text/javascript";
  refererpolicy:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  nonce?: string;
  nomodule?: boolean;
  integrity?: string;
  fetchpriority?: "high" | "low" | "auto";
  crossorigin?: "anonymous" | "use-credentials";
  blocking?: boolean;
  attributionsrc?: boolean | string;
  src?: string;
} & {
  src: string;
  defer: true;
} & {
  src: string;
  async: true;
};
export interface ExecuteScriptOptions extends DatastarEventOptions {
  [DatastarDatalineAutoRemove]?: boolean;
  [DatastarDatalineAttributes]?: ScriptAttributes;
}
export interface ExecuteScriptEvent {
  event: "datastar-execute-script";
  options: ExecuteScriptOptions;
  [DatastarDatalineScript]: string;
}
export declare const sseHeaders: {
  readonly "Cache-Control": "no-cache";
  readonly Connection: "keep-alive";
  readonly "Content-Type": "text/event-stream";
};
export type MultilineDatalinePrefix =
  | typeof DatastarDatalineScript
  | typeof DatastarDatalineFragments
  | typeof DatastarDatalineSignals;
export type DatastarEventOptionsUnion =
  | MergeFragmentsOptions
  | FragmentOptions
  | MergeSignalsOptions
  | DatastarEventOptions
  | ExecuteScriptOptions;
export type DatastarEvent =
  | MergeFragmentsEvent
  | RemoveFragmentsEvent
  | MergeSignalsEvent
  | RemoveSignalsEvent
  | ExecuteScriptEvent;
export declare const DefaultMapping: {
  readonly mergeMode: "morph";
  readonly settleDuration: 300;
  readonly useViewTransition: false;
  readonly onlyIfMissing: false;
  readonly attributes: {
    readonly [x: string]: string;
  };
  readonly autoRemove: true;
};
export {};
//# sourceMappingURL=types.d.ts.map
