"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./app/globals.css":
/*!*************************!*\
  !*** ./app/globals.css ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"937f9092577d\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9nbG9iYWxzLmNzcyIsIm1hcHBpbmdzIjoiO0FBQUEsK0RBQWUsY0FBYztBQUM3QixJQUFJLElBQVUsSUFBSSxpQkFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2dsb2JhbHMuY3NzPzZlZDMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCI5MzdmOTA5MjU3N2RcIlxuaWYgKG1vZHVsZS5ob3QpIHsgbW9kdWxlLmhvdC5hY2NlcHQoKSB9XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./app/firebase.js":
/*!*************************!*\
  !*** ./app/firebase.js ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addCommentToMessage: function() { return /* binding */ addCommentToMessage; },\n/* harmony export */   addMessageToChannel: function() { return /* binding */ addMessageToChannel; },\n/* harmony export */   addUserToFirestore: function() { return /* binding */ addUserToFirestore; },\n/* harmony export */   auth: function() { return /* binding */ auth; },\n/* harmony export */   getAllCommentsFromMessage: function() { return /* binding */ getAllCommentsFromMessage; },\n/* harmony export */   getAllMessagesFromChannel: function() { return /* binding */ getAllMessagesFromChannel; },\n/* harmony export */   listenForComments: function() { return /* binding */ listenForComments; },\n/* harmony export */   listenForMessages: function() { return /* binding */ listenForMessages; },\n/* harmony export */   updateLikesInFirebase: function() { return /* binding */ updateLikesInFirebase; }\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"(app-pages-browser)/./node_modules/firebase/app/dist/esm/index.esm.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"(app-pages-browser)/./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"(app-pages-browser)/./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n// Import the functions you need from the SDKs you need\n\n\n\n\nconst firebaseConfig = {\n    apiKey: \"AIzaSyBe7LVB7NZGQ4ih869GmtX2iwYvE0hzbLE\",\n    authDomain: \"discordbot-5a1b5.firebaseapp.com\",\n    projectId: \"discordbot-5a1b5\",\n    storageBucket: \"discordbot-5a1b5.appspot.com\",\n    messagingSenderId: \"942074563442\",\n    appId: \"1:942074563442:web:ee7686c5bce688559aebeb\"\n};\n// Initialize Firebase\nconst app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);\nconst auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);\nconst db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)(app);\nconst addUserToFirestore = async (user)=>{\n    const userRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(db, \"users\", uid);\n    try {\n        const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(userRef);\n        if (!docSnap.exists()) {\n            // Document with this uid does not exist, so add it\n            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.addDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.collection)(db, \"users\"), {\n                uid: user.uid,\n                photo: user.photoURL,\n                displayName: user.displayName,\n                email: user.email,\n                createdAt: Date.now(),\n                isAdmin: false\n            });\n        } else {\n            console.log(\"Document with uid\", uid, \"already exists.\");\n        }\n    } catch (error) {\n        console.error(\"Error adding user to Firestore: \", error);\n    }\n};\nconst addMessageToChannel = async (channelId, messageData)=>{\n    // Create channel document if not exists\n    const channelRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(db, \"channels\", channelId);\n    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.setDoc)(channelRef, {\n        name: channelId\n    }, {\n        merge: true\n    });\n    const user = auth.currentUser;\n    // Add message to messages subcollection\n    const messagesRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.collection)(db, \"channels\", channelId, \"messages\");\n    console.log(user);\n    console.log(messageData.text);\n    const image = await fetchImageForMessage();\n    try {\n        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.addDoc)(messagesRef, {\n            text: messageData.text,\n            userName: user.displayName,\n            userPhoto: user.photoURL,\n            imageUrl: image,\n            timestamp: Date.now(),\n            likes: 0,\n            replies: 0\n        });\n        console.log(\"Message added successfully.\");\n    } catch (error) {\n        console.error(\"Error adding message: \", error);\n    }\n};\nconst listenForComments = (channelId, messageId, callback)=>{\n    const commentsRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.collection)(db, \"channels\", channelId, \"messages\", messageId, \"comments\");\n    const orderedCommentsQuery = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.query)(commentsRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.orderBy)(\"date\", \"asc\"));\n    const unsubscribe = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.onSnapshot)(orderedCommentsQuery, (snapshot)=>{\n        const newComments = [];\n        snapshot.docChanges().forEach((change)=>{\n            if (change.type === \"added\") {\n                newComments.push({\n                    id: change.doc.id,\n                    ...change.doc.data()\n                });\n            }\n        });\n        callback(newComments);\n    });\n    return unsubscribe; // Return the unsubscribe function\n};\nconst listenForMessages = (channelId, callback)=>{\n    const messagesRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.collection)(db, \"channels\", channelId, \"messages\");\n    const orderedMessagesQuery = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.query)(messagesRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.orderBy)(\"timestamp\", \"desc\"));\n    const unsubscribe = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.onSnapshot)(orderedMessagesQuery, (snapshot)=>{\n        const messages = [];\n        snapshot.forEach((doc)=>{\n            messages.push({\n                id: doc.id,\n                ...doc.data()\n            });\n        });\n        // Reverse the order of messages to display the newest first\n        callback(messages.reverse());\n    });\n    return unsubscribe; // Return the unsubscribe function\n};\n// Function to add a new comment to a message\nconst addCommentToMessage = async (channelId, messageId, commentData)=>{\n    // Create message document if not exists\n    const messageRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(db, \"channels\", channelId, \"messages\", messageId);\n    try {\n        // Get the message document snapshot\n        const messageDoc = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDoc)(messageRef);\n        if (messageDoc.exists()) {\n            // Get the current replies count from the message data\n            const currentReplies = messageDoc.data().replies || 0;\n            // Increment the replies count by 1\n            const newRepliesCount = currentReplies + 1;\n            // Update the message document with the new replies count\n            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(messageRef, {\n                replies: newRepliesCount\n            });\n            // Add comment to comments subcollection\n            const commentsRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.collection)(db, \"channels\", channelId, \"messages\", messageId, \"comments\");\n            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.addDoc)(commentsRef, {\n                text: commentData.text,\n                sender: commentData.sender,\n                userPhoto: commentData.userPhoto,\n                date: Date.now(),\n                likes: commentData.likes || 0\n            });\n            console.log(\"Comment added successfully.\");\n        } else {\n            console.error(\"Message not found.\");\n        }\n    } catch (error) {\n        console.error(\"Error adding comment: \", error);\n    }\n};\n// Function to retrieve all messages from a channel\nconst getAllMessagesFromChannel = async (channelId)=>{\n    const messagesRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.collection)(db, \"channels\", channelId, \"messages\");\n    const orderedMessagesQuery = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.query)(messagesRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.orderBy)(\"timestamp\", \"desc\"));\n    try {\n        const querySnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDocs)(orderedMessagesQuery);\n        const messages = [];\n        querySnapshot.forEach((doc)=>{\n            messages.push({\n                id: doc.id,\n                ...doc.data()\n            });\n        });\n        console.log(messages.rev);\n        return messages.reverse();\n    } catch (error) {\n        console.error(\"Error getting messages: \", error);\n        return [];\n    }\n};\n// Function to retrieve all comments from a message\nconst getAllCommentsFromMessage = async (channelId, messageId)=>{\n    const commentsRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.collection)(db, \"channels\", channelId, \"messages\", messageId, \"comments\");\n    const commentsQuery = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.query)(commentsRef);\n    try {\n        const querySnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDocs)(commentsQuery);\n        const comments = [];\n        querySnapshot.forEach((doc)=>{\n            comments.push({\n                id: doc.id,\n                ...doc.data()\n            });\n        });\n        return comments;\n    } catch (error) {\n        console.error(\"Error getting comments: \", error);\n        return [];\n    }\n};\nconst updateLikesInFirebase = async (channelId, messageId, newLikesCount)=>{\n    const messageRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(db, \"channels/\".concat(channelId, \"/messages/\").concat(messageId));\n    try {\n        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.updateDoc)(messageRef, {\n            likes: newLikesCount\n        });\n        console.log(\"Likes updated successfully in Firebase.\");\n    } catch (error) {\n        console.error(\"Error updating likes in Firebase:\", error);\n    }\n};\n\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUEsQ0FBQ21CLElBQUksWUFBWW1CLFdBQVcsWUFBWWlCLFdBQVc7SUFDakYsTUFBTThCLGdCQUFnQnhGLHlEQUFLQSxDQUFDNEQ7SUFFNUIsSUFBSTtRQUNGLE1BQU15QixnQkFBZ0IsTUFBTWhGLDJEQUFPQSxDQUFDbUY7UUFDcEMsTUFBTUMsV0FBVyxFQUFFO1FBQ25CSixjQUFjbkIsT0FBTyxDQUFDLENBQUMzRDtZQUNyQmtGLFNBQVNwQixJQUFJLENBQUM7Z0JBQUVDLElBQUkvRCxJQUFJK0QsRUFBRTtnQkFBRSxHQUFHL0QsSUFBSWdFLElBQUksRUFBRTtZQUFDO1FBQzVDO1FBQ0EsT0FBT2tCO0lBQ1QsRUFBRSxPQUFPbEQsT0FBTztRQUNkRixRQUFRRSxLQUFLLENBQUMsNEJBQTRCQTtRQUMxQyxPQUFPLEVBQUU7SUFDWDtBQUNGLEVBQUU7QUFFSyxNQUFNbUQsd0JBQXdCLE9BQU9qRCxXQUFXaUIsV0FBV2lDO0lBQ2hFLE1BQU1iLGFBQWF2RSx1REFBR0EsQ0FBQ2UsSUFBSSxZQUFrQ29DLE9BQXRCakIsV0FBVSxjQUFzQixPQUFWaUI7SUFFN0QsSUFBSTtRQUNBLE1BQU1sRCw2REFBU0EsQ0FBQ3NFLFlBQVk7WUFDeEJ2QixPQUFPb0M7UUFDWDtRQUNBdEQsUUFBUUMsR0FBRyxDQUFDO0lBQ2hCLEVBQUUsT0FBT0MsT0FBTztRQUNaRixRQUFRRSxLQUFLLENBQUMscUNBQXFDQTtJQUN2RDtBQUNGLEVBQUU7QUFJWSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvZmlyZWJhc2UuanM/MzEzYiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnQgdGhlIGZ1bmN0aW9ucyB5b3UgbmVlZCBmcm9tIHRoZSBTREtzIHlvdSBuZWVkXG5pbXBvcnQgeyBpbml0aWFsaXplQXBwIH0gZnJvbSBcImZpcmViYXNlL2FwcFwiO1xuaW1wb3J0IHsgZ2V0QXV0aCB9IGZyb20gXCJmaXJlYmFzZS9hdXRoXCI7XG5pbXBvcnQgeyBxdWVyeSx3aGVyZSxnZXRGaXJlc3RvcmUsIGNvbGxlY3Rpb24sIGFkZERvYywgZ2V0RG9jcywgZ2V0RG9jLCBkb2MsIHVwZGF0ZURvYyxzZXREb2Msb3JkZXJCeSxvblNuYXBzaG90fSBmcm9tIFwiZmlyZWJhc2UvZmlyZXN0b3JlXCI7XG5pbXBvcnQgeyBGaWVsZFZhbHVlIH0gZnJvbSBcImZpcmViYXNlL2ZpcmVzdG9yZVwiO1xuXG5cbmNvbnN0IGZpcmViYXNlQ29uZmlnID0ge1xuICBhcGlLZXk6IFwiQUl6YVN5QmU3TFZCN05aR1E0aWg4NjlHbXRYMml3WXZFMGh6YkxFXCIsXG4gIGF1dGhEb21haW46IFwiZGlzY29yZGJvdC01YTFiNS5maXJlYmFzZWFwcC5jb21cIixcbiAgcHJvamVjdElkOiBcImRpc2NvcmRib3QtNWExYjVcIixcbiAgc3RvcmFnZUJ1Y2tldDogXCJkaXNjb3JkYm90LTVhMWI1LmFwcHNwb3QuY29tXCIsXG4gIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjk0MjA3NDU2MzQ0MlwiLFxuICBhcHBJZDogXCIxOjk0MjA3NDU2MzQ0Mjp3ZWI6ZWU3Njg2YzViY2U2ODg1NTlhZWJlYlwiXG59O1xuXG4vLyBJbml0aWFsaXplIEZpcmViYXNlXG5jb25zdCBhcHAgPSBpbml0aWFsaXplQXBwKGZpcmViYXNlQ29uZmlnKTtcblxuY29uc3QgYXV0aCA9IGdldEF1dGgoYXBwKTtcbmNvbnN0IGRiID0gZ2V0RmlyZXN0b3JlKGFwcCk7XG5cbmV4cG9ydCBjb25zdCBhZGRVc2VyVG9GaXJlc3RvcmUgPSBhc3luYyAodXNlcikgPT4ge1xuICBjb25zdCB1c2VyUmVmID0gZG9jKGRiLCBcInVzZXJzXCIsIHVpZCk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBkb2NTbmFwID0gYXdhaXQgZ2V0RG9jKHVzZXJSZWYpO1xuICAgIFxuICAgIGlmICghZG9jU25hcC5leGlzdHMoKSkge1xuICAgICAgLy8gRG9jdW1lbnQgd2l0aCB0aGlzIHVpZCBkb2VzIG5vdCBleGlzdCwgc28gYWRkIGl0XG4gICAgICBhd2FpdCBhZGREb2MoY29sbGVjdGlvbihkYiwgXCJ1c2Vyc1wiKSwge1xuICAgICAgICB1aWQ6IHVzZXIudWlkLFxuICAgICAgICBwaG90bzogdXNlci5waG90b1VSTCxcbiAgICAgICAgZGlzcGxheU5hbWU6IHVzZXIuZGlzcGxheU5hbWUsXG4gICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICBjcmVhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgIGlzQWRtaW46IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRG9jdW1lbnQgd2l0aCB1aWRcIiwgdWlkLCBcImFscmVhZHkgZXhpc3RzLlwiKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFkZGluZyB1c2VyIHRvIEZpcmVzdG9yZTogXCIsIGVycm9yKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGFkZE1lc3NhZ2VUb0NoYW5uZWwgPSBhc3luYyAoY2hhbm5lbElkLG1lc3NhZ2VEYXRhKSA9PiB7XG4gIC8vIENyZWF0ZSBjaGFubmVsIGRvY3VtZW50IGlmIG5vdCBleGlzdHNcbiAgY29uc3QgY2hhbm5lbFJlZiA9IGRvYyhkYiwgXCJjaGFubmVsc1wiLCBjaGFubmVsSWQpO1xuICBhd2FpdCBzZXREb2MoY2hhbm5lbFJlZiwgeyBuYW1lOiBjaGFubmVsSWQgfSwgeyBtZXJnZTogdHJ1ZSB9KTtcblxuICBjb25zdCB1c2VyPWF1dGguY3VycmVudFVzZXI7XG5cbiAgLy8gQWRkIG1lc3NhZ2UgdG8gbWVzc2FnZXMgc3ViY29sbGVjdGlvblxuICBjb25zdCBtZXNzYWdlc1JlZiA9IGNvbGxlY3Rpb24oZGIsIFwiY2hhbm5lbHNcIiwgY2hhbm5lbElkLCBcIm1lc3NhZ2VzXCIpO1xuXG4gIGNvbnNvbGUubG9nKHVzZXIpO1xuICBjb25zb2xlLmxvZyhtZXNzYWdlRGF0YS50ZXh0KTtcbiAgY29uc3QgaW1hZ2U9IGF3YWl0IGZldGNoSW1hZ2VGb3JNZXNzYWdlKCk7XG5cblxuICB0cnkge1xuICAgIGF3YWl0IGFkZERvYyhtZXNzYWdlc1JlZiwge1xuICAgICAgdGV4dDogbWVzc2FnZURhdGEudGV4dCxcbiAgICAgIHVzZXJOYW1lOiB1c2VyLmRpc3BsYXlOYW1lLFxuICAgICAgdXNlclBob3RvOiB1c2VyLnBob3RvVVJMLFxuICAgICAgaW1hZ2VVcmw6IGltYWdlLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgbGlrZXM6IDAsXG4gICAgICByZXBsaWVzOiAwXG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coXCJNZXNzYWdlIGFkZGVkIHN1Y2Nlc3NmdWxseS5cIik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFkZGluZyBtZXNzYWdlOiBcIiwgZXJyb3IpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgbGlzdGVuRm9yQ29tbWVudHMgPSAoY2hhbm5lbElkLCBtZXNzYWdlSWQsIGNhbGxiYWNrKSA9PiB7XG4gIGNvbnN0IGNvbW1lbnRzUmVmID0gY29sbGVjdGlvbihkYiwgXCJjaGFubmVsc1wiLCBjaGFubmVsSWQsIFwibWVzc2FnZXNcIiwgbWVzc2FnZUlkLCBcImNvbW1lbnRzXCIpO1xuICBjb25zdCBvcmRlcmVkQ29tbWVudHNRdWVyeSA9IHF1ZXJ5KGNvbW1lbnRzUmVmLCBvcmRlckJ5KFwiZGF0ZVwiLCBcImFzY1wiKSk7XG5cbiAgY29uc3QgdW5zdWJzY3JpYmUgPSBvblNuYXBzaG90KG9yZGVyZWRDb21tZW50c1F1ZXJ5LCAoc25hcHNob3QpID0+IHtcbiAgICBjb25zdCBuZXdDb21tZW50cyA9IFtdO1xuICAgIHNuYXBzaG90LmRvY0NoYW5nZXMoKS5mb3JFYWNoKChjaGFuZ2UpID0+IHtcbiAgICAgIGlmIChjaGFuZ2UudHlwZSA9PT0gXCJhZGRlZFwiKSB7XG4gICAgICAgIG5ld0NvbW1lbnRzLnB1c2goeyBpZDogY2hhbmdlLmRvYy5pZCwgLi4uY2hhbmdlLmRvYy5kYXRhKCkgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY2FsbGJhY2sobmV3Q29tbWVudHMpO1xuICB9KTtcblxuICByZXR1cm4gdW5zdWJzY3JpYmU7IC8vIFJldHVybiB0aGUgdW5zdWJzY3JpYmUgZnVuY3Rpb25cbn07XG5cbmV4cG9ydCBjb25zdCBsaXN0ZW5Gb3JNZXNzYWdlcyA9IChjaGFubmVsSWQsIGNhbGxiYWNrKSA9PiB7XG4gIGNvbnN0IG1lc3NhZ2VzUmVmID0gY29sbGVjdGlvbihkYiwgXCJjaGFubmVsc1wiLCBjaGFubmVsSWQsIFwibWVzc2FnZXNcIik7XG4gIGNvbnN0IG9yZGVyZWRNZXNzYWdlc1F1ZXJ5ID0gcXVlcnkobWVzc2FnZXNSZWYsIG9yZGVyQnkoXCJ0aW1lc3RhbXBcIiwgXCJkZXNjXCIpKTtcblxuICBjb25zdCB1bnN1YnNjcmliZSA9IG9uU25hcHNob3Qob3JkZXJlZE1lc3NhZ2VzUXVlcnksIChzbmFwc2hvdCkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VzID0gW107XG4gICAgc25hcHNob3QuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICBtZXNzYWdlcy5wdXNoKHsgaWQ6IGRvYy5pZCwgLi4uZG9jLmRhdGEoKSB9KTtcbiAgICB9KTtcbiAgICAvLyBSZXZlcnNlIHRoZSBvcmRlciBvZiBtZXNzYWdlcyB0byBkaXNwbGF5IHRoZSBuZXdlc3QgZmlyc3RcbiAgICBjYWxsYmFjayhtZXNzYWdlcy5yZXZlcnNlKCkpO1xuICB9KTtcblxuICByZXR1cm4gdW5zdWJzY3JpYmU7IC8vIFJldHVybiB0aGUgdW5zdWJzY3JpYmUgZnVuY3Rpb25cbn07XG5cbi8vIEZ1bmN0aW9uIHRvIGFkZCBhIG5ldyBjb21tZW50IHRvIGEgbWVzc2FnZVxuZXhwb3J0IGNvbnN0IGFkZENvbW1lbnRUb01lc3NhZ2UgPSBhc3luYyAoY2hhbm5lbElkLCBtZXNzYWdlSWQsIGNvbW1lbnREYXRhKSA9PiB7XG4gIC8vIENyZWF0ZSBtZXNzYWdlIGRvY3VtZW50IGlmIG5vdCBleGlzdHNcbiAgY29uc3QgbWVzc2FnZVJlZiA9IGRvYyhkYiwgXCJjaGFubmVsc1wiLCBjaGFubmVsSWQsIFwibWVzc2FnZXNcIiwgbWVzc2FnZUlkKTtcblxuICB0cnkge1xuICAgIC8vIEdldCB0aGUgbWVzc2FnZSBkb2N1bWVudCBzbmFwc2hvdFxuICAgIGNvbnN0IG1lc3NhZ2VEb2MgPSBhd2FpdCBnZXREb2MobWVzc2FnZVJlZik7XG4gICAgaWYgKG1lc3NhZ2VEb2MuZXhpc3RzKCkpIHtcbiAgICAgIC8vIEdldCB0aGUgY3VycmVudCByZXBsaWVzIGNvdW50IGZyb20gdGhlIG1lc3NhZ2UgZGF0YVxuICAgICAgY29uc3QgY3VycmVudFJlcGxpZXMgPSBtZXNzYWdlRG9jLmRhdGEoKS5yZXBsaWVzIHx8IDA7XG5cbiAgICAgIC8vIEluY3JlbWVudCB0aGUgcmVwbGllcyBjb3VudCBieSAxXG4gICAgICBjb25zdCBuZXdSZXBsaWVzQ291bnQgPSBjdXJyZW50UmVwbGllcyArIDE7XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgbWVzc2FnZSBkb2N1bWVudCB3aXRoIHRoZSBuZXcgcmVwbGllcyBjb3VudFxuICAgICAgYXdhaXQgdXBkYXRlRG9jKG1lc3NhZ2VSZWYsIHtcbiAgICAgICAgcmVwbGllczogbmV3UmVwbGllc0NvdW50LFxuICAgICAgfSk7XG5cbiAgICAgIC8vIEFkZCBjb21tZW50IHRvIGNvbW1lbnRzIHN1YmNvbGxlY3Rpb25cbiAgICAgIGNvbnN0IGNvbW1lbnRzUmVmID0gY29sbGVjdGlvbihcbiAgICAgICAgZGIsXG4gICAgICAgIFwiY2hhbm5lbHNcIixcbiAgICAgICAgY2hhbm5lbElkLFxuICAgICAgICBcIm1lc3NhZ2VzXCIsXG4gICAgICAgIG1lc3NhZ2VJZCxcbiAgICAgICAgXCJjb21tZW50c1wiXG4gICAgICApO1xuXG4gICAgICBhd2FpdCBhZGREb2MoY29tbWVudHNSZWYsIHtcbiAgICAgICAgdGV4dDogY29tbWVudERhdGEudGV4dCxcbiAgICAgICAgc2VuZGVyOiBjb21tZW50RGF0YS5zZW5kZXIsXG4gICAgICAgIHVzZXJQaG90bzogY29tbWVudERhdGEudXNlclBob3RvLFxuICAgICAgICBkYXRlOiBEYXRlLm5vdygpLFxuICAgICAgICBsaWtlczogY29tbWVudERhdGEubGlrZXMgfHwgMCxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zb2xlLmxvZyhcIkNvbW1lbnQgYWRkZWQgc3VjY2Vzc2Z1bGx5LlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihcIk1lc3NhZ2Ugbm90IGZvdW5kLlwiKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFkZGluZyBjb21tZW50OiBcIiwgZXJyb3IpO1xuICB9XG59O1xuXG4vLyBGdW5jdGlvbiB0byByZXRyaWV2ZSBhbGwgbWVzc2FnZXMgZnJvbSBhIGNoYW5uZWxcbmV4cG9ydCBjb25zdCBnZXRBbGxNZXNzYWdlc0Zyb21DaGFubmVsID0gYXN5bmMgKGNoYW5uZWxJZCkgPT4ge1xuICBjb25zdCBtZXNzYWdlc1JlZiA9IGNvbGxlY3Rpb24oZGIsIFwiY2hhbm5lbHNcIiwgY2hhbm5lbElkLCBcIm1lc3NhZ2VzXCIpO1xuICBjb25zdCBvcmRlcmVkTWVzc2FnZXNRdWVyeSA9IHF1ZXJ5KG1lc3NhZ2VzUmVmLCBvcmRlckJ5KFwidGltZXN0YW1wXCIsIFwiZGVzY1wiKSk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBxdWVyeVNuYXBzaG90ID0gYXdhaXQgZ2V0RG9jcyhvcmRlcmVkTWVzc2FnZXNRdWVyeSk7XG4gICAgY29uc3QgbWVzc2FnZXMgPSBbXTtcbiAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goKGRvYykgPT4ge1xuICAgICAgbWVzc2FnZXMucHVzaCh7IGlkOiBkb2MuaWQsIC4uLmRvYy5kYXRhKCkgfSk7XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZXMucmV2KTtcbiAgICByZXR1cm4gbWVzc2FnZXMucmV2ZXJzZSgpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBnZXR0aW5nIG1lc3NhZ2VzOiBcIiwgZXJyb3IpO1xuICAgIHJldHVybiBbXTtcbiAgfVxufTtcblxuXG4vLyBGdW5jdGlvbiB0byByZXRyaWV2ZSBhbGwgY29tbWVudHMgZnJvbSBhIG1lc3NhZ2VcbmV4cG9ydCBjb25zdCBnZXRBbGxDb21tZW50c0Zyb21NZXNzYWdlID0gYXN5bmMgKGNoYW5uZWxJZCwgbWVzc2FnZUlkKSA9PiB7XG4gIGNvbnN0IGNvbW1lbnRzUmVmID0gY29sbGVjdGlvbihkYiwgXCJjaGFubmVsc1wiLCBjaGFubmVsSWQsIFwibWVzc2FnZXNcIiwgbWVzc2FnZUlkLCBcImNvbW1lbnRzXCIpO1xuICBjb25zdCBjb21tZW50c1F1ZXJ5ID0gcXVlcnkoY29tbWVudHNSZWYpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcXVlcnlTbmFwc2hvdCA9IGF3YWl0IGdldERvY3MoY29tbWVudHNRdWVyeSk7XG4gICAgY29uc3QgY29tbWVudHMgPSBbXTtcbiAgICBxdWVyeVNuYXBzaG90LmZvckVhY2goKGRvYykgPT4ge1xuICAgICAgY29tbWVudHMucHVzaCh7IGlkOiBkb2MuaWQsIC4uLmRvYy5kYXRhKCkgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbW1lbnRzO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBnZXR0aW5nIGNvbW1lbnRzOiBcIiwgZXJyb3IpO1xuICAgIHJldHVybiBbXTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUxpa2VzSW5GaXJlYmFzZSA9IGFzeW5jIChjaGFubmVsSWQsIG1lc3NhZ2VJZCwgbmV3TGlrZXNDb3VudCkgPT4ge1xuICBjb25zdCBtZXNzYWdlUmVmID0gZG9jKGRiLCBgY2hhbm5lbHMvJHtjaGFubmVsSWR9L21lc3NhZ2VzLyR7bWVzc2FnZUlkfWApO1xuXG4gIHRyeSB7XG4gICAgICBhd2FpdCB1cGRhdGVEb2MobWVzc2FnZVJlZiwge1xuICAgICAgICAgIGxpa2VzOiBuZXdMaWtlc0NvdW50LFxuICAgICAgfSk7XG4gICAgICBjb25zb2xlLmxvZygnTGlrZXMgdXBkYXRlZCBzdWNjZXNzZnVsbHkgaW4gRmlyZWJhc2UuJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB1cGRhdGluZyBsaWtlcyBpbiBGaXJlYmFzZTonLCBlcnJvcik7XG4gIH1cbn07XG5cblxuXG5leHBvcnQge2F1dGh9OyJdLCJuYW1lcyI6WyJpbml0aWFsaXplQXBwIiwiZ2V0QXV0aCIsInF1ZXJ5Iiwid2hlcmUiLCJnZXRGaXJlc3RvcmUiLCJjb2xsZWN0aW9uIiwiYWRkRG9jIiwiZ2V0RG9jcyIsImdldERvYyIsImRvYyIsInVwZGF0ZURvYyIsInNldERvYyIsIm9yZGVyQnkiLCJvblNuYXBzaG90IiwiRmllbGRWYWx1ZSIsImZpcmViYXNlQ29uZmlnIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsInByb2plY3RJZCIsInN0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsImFwcElkIiwiYXBwIiwiYXV0aCIsImRiIiwiYWRkVXNlclRvRmlyZXN0b3JlIiwidXNlciIsInVzZXJSZWYiLCJ1aWQiLCJkb2NTbmFwIiwiZXhpc3RzIiwicGhvdG8iLCJwaG90b1VSTCIsImRpc3BsYXlOYW1lIiwiZW1haWwiLCJjcmVhdGVkQXQiLCJEYXRlIiwibm93IiwiaXNBZG1pbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImFkZE1lc3NhZ2VUb0NoYW5uZWwiLCJjaGFubmVsSWQiLCJtZXNzYWdlRGF0YSIsImNoYW5uZWxSZWYiLCJuYW1lIiwibWVyZ2UiLCJjdXJyZW50VXNlciIsIm1lc3NhZ2VzUmVmIiwidGV4dCIsImltYWdlIiwiZmV0Y2hJbWFnZUZvck1lc3NhZ2UiLCJ1c2VyTmFtZSIsInVzZXJQaG90byIsImltYWdlVXJsIiwidGltZXN0YW1wIiwibGlrZXMiLCJyZXBsaWVzIiwibGlzdGVuRm9yQ29tbWVudHMiLCJtZXNzYWdlSWQiLCJjYWxsYmFjayIsImNvbW1lbnRzUmVmIiwib3JkZXJlZENvbW1lbnRzUXVlcnkiLCJ1bnN1YnNjcmliZSIsInNuYXBzaG90IiwibmV3Q29tbWVudHMiLCJkb2NDaGFuZ2VzIiwiZm9yRWFjaCIsImNoYW5nZSIsInR5cGUiLCJwdXNoIiwiaWQiLCJkYXRhIiwibGlzdGVuRm9yTWVzc2FnZXMiLCJvcmRlcmVkTWVzc2FnZXNRdWVyeSIsIm1lc3NhZ2VzIiwicmV2ZXJzZSIsImFkZENvbW1lbnRUb01lc3NhZ2UiLCJjb21tZW50RGF0YSIsIm1lc3NhZ2VSZWYiLCJtZXNzYWdlRG9jIiwiY3VycmVudFJlcGxpZXMiLCJuZXdSZXBsaWVzQ291bnQiLCJzZW5kZXIiLCJkYXRlIiwiZ2V0QWxsTWVzc2FnZXNGcm9tQ2hhbm5lbCIsInF1ZXJ5U25hcHNob3QiLCJyZXYiLCJnZXRBbGxDb21tZW50c0Zyb21NZXNzYWdlIiwiY29tbWVudHNRdWVyeSIsImNvbW1lbnRzIiwidXBkYXRlTGlrZXNJbkZpcmViYXNlIiwibmV3TGlrZXNDb3VudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/firebase.js\n"));

/***/ })

});