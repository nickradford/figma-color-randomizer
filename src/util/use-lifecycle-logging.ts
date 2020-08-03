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

    // Data Persistence
    log(EVENTS.PERSIST_DATA);
    log(EVENTS.PERSIST_DATA_SUCCESS);

    log(EVENTS.FETCH_PERSISTED_DATA);
    log(EVENTS.FETCH_PERSISTED_DATA_SUCCESS);
  }, []);
};
