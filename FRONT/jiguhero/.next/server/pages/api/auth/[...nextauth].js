"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/google":
/*!*********************************************!*\
  !*** external "next-auth/providers/google" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/google");

/***/ }),

/***/ "next-auth/providers/kakao":
/*!********************************************!*\
  !*** external "next-auth/providers/kakao" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/kakao");

/***/ }),

/***/ "next-auth/providers/naver":
/*!********************************************!*\
  !*** external "next-auth/providers/naver" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/naver");

/***/ }),

/***/ "(api)/./pages/api/auth/[...nextauth].ts":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"next-auth/providers/google\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/kakao */ \"next-auth/providers/kakao\");\n/* harmony import */ var next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_auth_providers_naver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/providers/naver */ \"next-auth/providers/naver\");\n/* harmony import */ var next_auth_providers_naver__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_naver__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n    providers: [\n        next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2___default()({\n            clientId: process.env.KAKAO_CLIENT_ID,\n            clientSecret: process.env.KAKAO_CLIENT_SECRET\n        }),\n        next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default()({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        }),\n        next_auth_providers_naver__WEBPACK_IMPORTED_MODULE_3___default()({\n            clientId: process.env.NAVER_CLIENT_ID,\n            clientSecret: process.env.NAVER_CLIENT_SECRET\n        }), \n    ],\n    secret: process.env.SECRET,\n    session: {\n        strategy: \"jwt\"\n    }\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFpQztBQUN1QjtBQUNGO0FBQ0Q7QUFFckQsaUVBQWVBLGdEQUFRLENBQUM7SUFDdEJJLFNBQVMsRUFBRTtRQUNURixnRUFBYSxDQUFDO1lBQ1pHLFFBQVEsRUFBRUMsT0FBTyxDQUFDQyxHQUFHLENBQUNDLGVBQWU7WUFDckNDLFlBQVksRUFBRUgsT0FBTyxDQUFDQyxHQUFHLENBQUNHLG1CQUFtQjtTQUM5QyxDQUFDO1FBQ0ZULGlFQUFjLENBQUM7WUFDYkksUUFBUSxFQUFFQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0ksZ0JBQWdCO1lBQ3RDRixZQUFZLEVBQUVILE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSyxvQkFBb0I7U0FDL0MsQ0FBQztRQUNGVCxnRUFBYSxDQUFDO1lBQ1pFLFFBQVEsRUFBRUMsT0FBTyxDQUFDQyxHQUFHLENBQUNNLGVBQWU7WUFDckNKLFlBQVksRUFBRUgsT0FBTyxDQUFDQyxHQUFHLENBQUNPLG1CQUFtQjtTQUM5QyxDQUFDO0tBRUg7SUFFREMsTUFBTSxFQUFFVCxPQUFPLENBQUNDLEdBQUcsQ0FBQ1MsTUFBTTtJQUUxQkMsT0FBTyxFQUFFO1FBQ1BDLFFBQVEsRUFBRSxLQUFLO0tBQ2hCO0NBQ0YsQ0FBQyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vamlndWhlcm8vLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLnRzPzJlOGIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIjtcclxuaW1wb3J0IEdvb2dsZVByb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZVwiO1xyXG5pbXBvcnQgS2FrYW9Qcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9rYWthb1wiO1xyXG5pbXBvcnQgTmF2ZXJQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9uYXZlclwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZXh0QXV0aCh7XHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBLYWthb1Byb3ZpZGVyKHtcclxuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LktBS0FPX0NMSUVOVF9JRCxcclxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5LQUtBT19DTElFTlRfU0VDUkVULFxyXG4gICAgfSksXHJcbiAgICBHb29nbGVQcm92aWRlcih7XHJcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lELFxyXG4gICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVULFxyXG4gICAgfSksXHJcbiAgICBOYXZlclByb3ZpZGVyKHtcclxuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52Lk5BVkVSX0NMSUVOVF9JRCxcclxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5OQVZFUl9DTElFTlRfU0VDUkVULFxyXG4gICAgfSksXHJcblxyXG4gIF0sXHJcblxyXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuU0VDUkVULFxyXG5cclxuICBzZXNzaW9uOiB7XHJcbiAgICBzdHJhdGVneTogXCJqd3RcIixcclxuICB9LFxyXG59KTtcclxuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiR29vZ2xlUHJvdmlkZXIiLCJLYWthb1Byb3ZpZGVyIiwiTmF2ZXJQcm92aWRlciIsInByb3ZpZGVycyIsImNsaWVudElkIiwicHJvY2VzcyIsImVudiIsIktBS0FPX0NMSUVOVF9JRCIsImNsaWVudFNlY3JldCIsIktBS0FPX0NMSUVOVF9TRUNSRVQiLCJHT09HTEVfQ0xJRU5UX0lEIiwiR09PR0xFX0NMSUVOVF9TRUNSRVQiLCJOQVZFUl9DTElFTlRfSUQiLCJOQVZFUl9DTElFTlRfU0VDUkVUIiwic2VjcmV0IiwiU0VDUkVUIiwic2Vzc2lvbiIsInN0cmF0ZWd5Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/[...nextauth].ts"));
module.exports = __webpack_exports__;

})();