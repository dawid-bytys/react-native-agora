/**
 * Represents a video stream configuration for Picture-in-Picture (PiP) mode.
 *
 * This class holds the connection and canvas settings needed to display
 * a video stream within the PiP window.
 */

/**
 * Layout configuration for Picture-in-Picture (PiP) video streams.
 *
 * This class defines how multiple video streams should be arranged in a flow layout,
 * where streams are placed from left to right and top to bottom in sequence.
 *
 * Example layout with padding=10, spacing=5, column=3:
 * ```
 * ┌────────────────────────────────────┐
 * │                                    │
 * │  ┌────┐  ┌────┐  ┌────┐           │
 * │  │ 1  │  │ 2  │  │ 3  │           │
 * │  └────┘  └────┘  └────┘           │
 * │                                    │
 * │  ┌────┐  ┌────┐  ┌────┐           │
 * │  │ 4  │  │ 5  │  │ 6  │           │
 * │  └────┘  └────┘  └────┘           │
 * │                                    │
 * │  ┌────┐                           │
 * │  │ 7  │                           │
 * │  └────┘                           │
 * │                                    │
 * └────────────────────────────────────┘
 * ```
 */
export class AgoraPipContentViewLayout {}

/**
 * Configuration options for Agora Picture-in-Picture (PiP) mode.
 *
 * This class provides platform-specific options to configure PiP behavior
 * for both Android and iOS platforms.
 */
export class AgoraPipOptions {}

/** Represents the current state of Picture-in-Picture mode. */
export let AgoraPipState = /*#__PURE__*/function (AgoraPipState) {
  AgoraPipState[AgoraPipState["pipStateStarted"] = 0] = "pipStateStarted";
  AgoraPipState[AgoraPipState["pipStateStopped"] = 1] = "pipStateStopped";
  AgoraPipState[AgoraPipState["pipStateFailed"] = 2] = "pipStateFailed";
  return AgoraPipState;
}({});

/**
 * Observer for Picture-in-Picture state changes.
 *
 * Implement this class to receive notifications about PiP state transitions
 * and potential errors.
 */

/**
 * Controller interface for managing Picture-in-Picture functionality.
 *
 * This abstract class defines the methods required to control PiP mode,
 * including setup, state management, and lifecycle operations.
 */
export class AgoraPip {}
//# sourceMappingURL=IAgoraPip.js.map