import React, { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { AlertList, Dialog, Menu } from "../components/util/feedback";

import { isEmptyObj } from "./util";

// Context that handles feedback related events
// Alerts, Dialogs, etc...

/*
const exampleFeedback = {
  // there can be multiple alerts, hence the key
  alerts: {
    key1: {
      msg: "This is a success alert",
      severity: "success",
      handleClose: () => {}, // callback to data
      params: {
        lifetimeMS: 3000 // visible for 3 seconds. the default for any alert. 0 means the alert stays visible until dismissed
      }
    },
    key2: {
      // ...
    }
  },
  dialog: {
    title: "My Dialog Title",
    content: "Some text or react component",
    actions: 'react component',
    handleClose: () => {},
    params: {
      override: false // by default, setting a dialog over existing one does nothign, you can make it override here
    }
  },
  menu: {
    anchor: `React component`,
    items: [],
    handleClose: () => {},
    params: {
      override: false
    }
  }
};
*/

const defFeedback = {
  alerts: {},
  dialog: {},
  menu: {}
};

const defAlertParams = {
  lifetimeMS: 3000
};

const defSingletonParams = {
  override: false
};

// different feedback-related actions
const feedbackActions = dispatch => ({
  // there can be multilpe alerts at once
  addAlert: (msg, severity, handleClose = () => {}, params = {}) => {
    // deepmerge default params and passed params
    params = Object.assign(defAlertParams, params);

    // generate alert uuid
    const key = uuidv4();
    dispatch({
      type: "ADD_ALERT",
      payload: { key, msg, severity, handleClose, params }
    });

    return key; // so user can access the alert and delete it
  },
  // There can only be one dialog at a time
  // any new dialogs will replace the old one
  //
  // Note that actions are overriten, but params are merged with defaults
  setDialog: (content, handleClose = () => {}, params = {}) => {
    // deepmerge default params and passed params
    params = Object.assign(defSingletonParams, params);

    dispatch({
      type: "SET_DIALOG",
      payload: { content, handleClose, params }
    });
  },
  setMenu: (ref, items, handleClose = () => {}, params = {}) => {
    // deepmerge default params and passed params
    params = Object.assign(defSingletonParams, params);

    // console.log(ref, ref instanceof HTMLElement);

    // if the ref is an html element or a position object
    const payload =
      ref instanceof HTMLElement
        ? { anchor: ref, items, handleClose, params }
        : { position: ref, items, handleClose, params };

    dispatch({
      type: "SET_MENU",
      payload
    });
  },
  remAlert: key => dispatch({ type: "REM_ALERT", payload: key }),
  remDialog: () => dispatch({ type: "REM_DIALOG" }),
  remMenu: () => dispatch({ type: "REM_MENU" })
});

// Where the feedback state is updated based on which actions
// are performed
const feedbackReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_ALERT": {
      const { key, ...alert } = payload;

      return { ...state, alerts: { ...state.alerts, [key]: alert } };
    }
    case "SET_DIALOG": {
      // if override is false and dialog is already set
      // do nothing
      if (!payload.params.override && !isEmptyObj(state.dialog)) return state;

      return { ...state, dialog: payload };
    }
    case "SET_MENU": {
      // if override is false and menu is already set
      // do nothing
      if (!payload.params.override && !isEmptyObj(state.menu)) return state;

      return { ...state, menu: payload };
    }
    case "REM_ALERT": {
      const key = payload;

      const newState = Object.assign({}, state);
      delete newState.alerts[key];

      return newState;
    }
    case "REM_DIALOG": {
      return { ...state, dialog: {} };
    }
    case "REM_MENU": {
      return { ...state, menu: {} };
    }
    default: {
      return state;
    }
  }
};

export const FeedbackContext = createContext();

// Any component that uses this context has access to and can edit alerts & dialogs
export const FeedbackProvider = ({ children, data = {} }) => {
  // reducer is fed a deeply merged object of `data` & `defFeeback` via `Object.assign`
  // feel free to change this merge to whatever you want
  const [feedbackState, dispatch] = useReducer(
    feedbackReducer,
    Object.assign(defFeedback, data)
  );

  const actions = feedbackActions(dispatch);
  const { alerts, dialog, menu } = feedbackState;

  return (
    <FeedbackContext.Provider value={{ feedbackState, ...actions }}>
      <AlertList alerts={alerts} remAlert={actions.remAlert} />
      <Dialog onClose={dialog.handleClose} remDialog={actions.remDialog}>
        {dialog.content}
      </Dialog>
      <Menu
        anchor={menu.anchor}
        position={menu.position}
        onClose={menu.handleClose}
        remMenu={actions.remMenu}
      >
        {menu.items}
      </Menu>
      {children}
    </FeedbackContext.Provider>
  );
};
