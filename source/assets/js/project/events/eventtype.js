goog.provide('feng.events');

goog.require('goog.userAgent');

/**
 * Event Types
 */
feng.events.EventType = {
	LOAD: 'load',
	LOAD_COMPLETE: 'load_complete',
	PROGRESS: 'progress',
	COMPLETE: 'complete',
	ERROR: 'error',
	UPDATE: 'update',
	CHANGE: 'change',
	CANCEL: 'cancel',
	START: 'start',
	END: 'end',
	PLAY: 'play',
	STOP: 'stop',
	PAUSE: 'pause',
	ADD: 'add',
	REMOVE: 'remove',
	SHOW: 'show',
	HIDE: 'hide',
	OPEN: 'open',
	CLOSE: 'close',
	TOGGLE: 'toggle',
	ANIMATE_IN: 'animate_in',
	ANIMATE_OUT: 'animate_out',
	ANIMATED_IN: 'animated_in',
	ANIMATED_OUT: 'animated_out',
	UNLOCK: 'unlock',
	DRAG: 'drag',
	DRAG_END: 'drag_end',
	MUTE: 'mute',
	UNMUTE: 'unmute',
	INPUT_DOWN: (goog.userAgent.MOBILE) ? goog.events.EventType.TOUCHSTART : goog.events.EventType.MOUSEDOWN,
	INPUT_MOVE: (goog.userAgent.MOBILE) ? goog.events.EventType.TOUCHMOVE : goog.events.EventType.MOUSEMOVE,
	INPUT_UP: (goog.userAgent.MOBILE) ? [goog.events.EventType.TOUCHEND, goog.events.EventType.TOUCHCANCEL] : goog.events.EventType.MOUSEUP,
	INPUT_OVER: (goog.userAgent.MOBILE) ? goog.events.EventType.TOUCHSTART : goog.events.EventType.MOUSEOVER
};