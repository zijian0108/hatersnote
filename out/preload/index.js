(() => {
"use strict";
var __webpack_modules__ = ({
"electron": (function (module) {
module.exports = require("electron");

}),
"./node_modules/.pnpm/@electron-toolkit+preload@3.0.2_electron@31.7.7/node_modules/@electron-toolkit/preload/dist/index.mjs": (function (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  electronAPI: () => (electronAPI),
  exposeElectronAPI: () => (exposeElectronAPI)
});
/* import */var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("electron");


const electronAPI = {
    ipcRenderer: {
        send(channel, ...args) {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.send(channel, ...args);
        },
        sendTo(webContentsId, channel, ...args) {
            const electronVer = process.versions.electron;
            const electronMajorVer = electronVer ? parseInt(electronVer.split('.')[0]) : 0;
            if (electronMajorVer >= 28) {
                throw new Error('"sendTo" method has been removed since Electron 28.');
            }
            else {
                electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.sendTo(webContentsId, channel, ...args);
            }
        },
        sendSync(channel, ...args) {
            return electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.sendSync(channel, ...args);
        },
        sendToHost(channel, ...args) {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.sendToHost(channel, ...args);
        },
        postMessage(channel, message, transfer) {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.postMessage(channel, message, transfer);
        },
        invoke(channel, ...args) {
            return electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke(channel, ...args);
        },
        on(channel, listener) {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.on(channel, listener);
            return () => {
                electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.removeListener(channel, listener);
            };
        },
        once(channel, listener) {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.once(channel, listener);
            return () => {
                electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.removeListener(channel, listener);
            };
        },
        removeListener(channel, listener) {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.removeListener(channel, listener);
            return this;
        },
        removeAllListeners(channel) {
            electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.removeAllListeners(channel);
        }
    },
    webFrame: {
        insertCSS(css) {
            return electron__WEBPACK_IMPORTED_MODULE_0__.webFrame.insertCSS(css);
        },
        setZoomFactor(factor) {
            if (typeof factor === 'number' && factor > 0) {
                electron__WEBPACK_IMPORTED_MODULE_0__.webFrame.setZoomFactor(factor);
            }
        },
        setZoomLevel(level) {
            if (typeof level === 'number') {
                electron__WEBPACK_IMPORTED_MODULE_0__.webFrame.setZoomLevel(level);
            }
        }
    },
    webUtils: {
        getPathForFile(file) {
            return electron__WEBPACK_IMPORTED_MODULE_0__.webUtils.getPathForFile(file);
        }
    },
    process: {
        get platform() {
            return process.platform;
        },
        get versions() {
            return process.versions;
        },
        get env() {
            return { ...process.env };
        }
    }
};
/**
 * Expose Electron APIs from your preload script, the API
 * will be accessible from the website on `window.electron`.
 */
function exposeElectronAPI() {
    if (process.contextIsolated) {
        try {
            electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld('electron', electronAPI);
        }
        catch (error) {
            console.error(error);
        }
    }
    else {
        // @ts-ignore (need dts)
        window.electron = electronAPI;
    }
}




}),

});
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId](module, module.exports, __webpack_require__);

// Return the exports of the module
return module.exports;

}

// webpack/runtime/compat_get_default_export
(() => {
// getDefaultExport function for compatibility with non-ESM modules
__webpack_require__.n = (module) => {
	var getter = module && module.__esModule ?
		() => (module['default']) :
		() => (module);
	__webpack_require__.d(getter, { a: getter });
	return getter;
};

})();
// webpack/runtime/define_property_getters
(() => {
__webpack_require__.d = (exports, definition) => {
	for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
    }
};
})();
// webpack/runtime/has_own_property
(() => {
__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
})();
// webpack/runtime/make_namespace_object
(() => {
// define __esModule on exports
__webpack_require__.r = (exports) => {
	if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	}
	Object.defineProperty(exports, '__esModule', { value: true });
};
})();
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* import */var _electron_toolkit_preload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/.pnpm/@electron-toolkit+preload@3.0.2_electron@31.7.7/node_modules/@electron-toolkit/preload/dist/index.mjs");
/* import */var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("electron");
/* import */var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);


// Custom APIs for renderer
const api = {
    getDeviceInfo: async ()=>{
        return await _electron_toolkit_preload__WEBPACK_IMPORTED_MODULE_0__.electronAPI.ipcRenderer.invoke('get-device-info');
    }
};
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        electron__WEBPACK_IMPORTED_MODULE_1__.contextBridge.exposeInMainWorld('electron', _electron_toolkit_preload__WEBPACK_IMPORTED_MODULE_0__.electronAPI);
        electron__WEBPACK_IMPORTED_MODULE_1__.contextBridge.exposeInMainWorld('api', api);
    } catch (error) {
        console.error(error);
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = _electron_toolkit_preload__WEBPACK_IMPORTED_MODULE_0__.electronAPI;
    // @ts-ignore (define in dts)
    window.api = api;
}

})();

module.exports = __webpack_exports__;
})()
;
//# sourceMappingURL=index.js.map