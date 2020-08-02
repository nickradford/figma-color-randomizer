import { on } from "@create-figma-plugin/utilities";
import { useEffect } from "preact/hooks";
import { EVENTS } from "../constants";

const log = (ev: EVENTS) => {
  on(ev, (e) => console.log(ev, e));
};

export const useLifecycleLogging = () => {
  useEffect(() => {
    log(EVENTS.ERROR);

    log(EVENTS.COMPLETE);

    log(EVENTS.VALIDATION_START);
    log(EVENTS.VALIDATION_END);

    log(EVENTS.EXECUTION_START);
    log(EVENTS.EXECUTION_END);
  }, []);
};
