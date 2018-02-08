import { fromJS } from 'immutable'
// window.__PRELOADED_STATE__  = {
//     "currentUser": {
//       "name": "Jackson Harrison",
//       "id": "6f998f3c-772b-5479-bf08-d4d49a789096",
//       "contacts": [
//         "5505cbdd-0af0-5987-8acb-8472bf2040d3",
//         "14ac5775-9940-55c1-8192-ff78d1255068",
//         "f48379ae-e64d-58a5-866d-0a6cca7b3306",
//         "b884c6af-57bc-5d7d-9897-5a5dd46d63de",
//         "75b4fa7b-0538-5c18-8297-c136dc7a5700",
//         "50a82efc-2358-5df6-aac0-3695413160ce"
//       ],
//       "channels": [],
//       "fetchStatus": "FETCHED",
//       "status": "ONLINE",
//       "activeChannel": "8b78f99b-a5f6-5f20-aa45-c35b6cc8c5c9"
//     },
//     "channels": [
//       {
//         "id": "509e5773-ef28-5242-8eda-7443445ffb0e",
//         "name": "Jackson Harrison's Private Channel",
//         "messages": [],
//         "fetchStatus": "NOT_FETCHED",
//         "participants": [
//           "6f998f3c-772b-5479-bf08-d4d49a789096"
//         ]
//       },
//       {
//         "id": "8b78f99b-a5f6-5f20-aa45-c35b6cc8c5c9",
//         "name": "Jackson Harrison and Chuck Simmons's Private Chat",
//         "participants": [
//           "6f998f3c-772b-5479-bf08-d4d49a789096",
//           "751ff0ed-5c40-5f65-a3b4-4855a8474aeb"
//         ],
//         "messages": [
//           {
//             "id": "65308c71-256d-53be-81a8-0f18d797ef25",
//             "owner": "6f998f3c-772b-5479-bf08-d4d49a789096",
//             "content": {
//               "text": "The code base is amazing!"
//             },
//             "date": "2017-02-02T13:35:14.654Z"
//           },
//           {
//             "id": "d1c1ec04-7697-5810-8403-95e48c8bd9a1",
//             "owner": "751ff0ed-5c40-5f65-a3b4-4855a8474aeb",
//             "content": {
//               "text": "The transpiler is amazing!"
//             },
//             "date": "2017-11-08T00:08:54.943Z"
//           },
//           {
//             "id": "03c2cb6d-59d2-5c9a-83ac-c0a87117849f",
//             "owner": "6f998f3c-772b-5479-bf08-d4d49a789096",
//             "content": {
//               "text": "The sprint is amazing!"
//             },
//             "date": "2017-08-17T02:12:30.957Z"
//           },
//           {
//             "id": "31d6b6bf-2fb9-5815-a7be-395dc987c3e6",
//             "owner": "751ff0ed-5c40-5f65-a3b4-4855a8474aeb",
//             "content": {
//               "text": "I've noticed a code base that you could refactor."
//             },
//             "date": "2017-05-13T05:09:10.478Z"
//           },
//           {
//             "id": "5af52e4a-c3ca-565c-abc0-297983da9de8",
//             "owner": "6f998f3c-772b-5479-bf08-d4d49a789096",
//             "content": {
//               "text": "I'm going to collate the version."
//             },
//             "date": "2017-12-22T03:29:22.997Z"
//           },
//           {
//             "id": "2ba8e45b-725d-58ee-9216-5b0c10aa8ffb",
//             "owner": "6f998f3c-772b-5479-bf08-d4d49a789096",
//             "content": {
//               "text": "Do you know how to check the debugger?"
//             },
//             "date": "2017-08-05T16:53:15.951Z"
//           },
//           {
//             "id": "23768029-bbae-5f6f-94aa-d510f8addb48",
//             "owner": "751ff0ed-5c40-5f65-a3b4-4855a8474aeb",
//             "content": {
//               "text": "Note to self: refactor the workflow."
//             },
//             "date": "2017-01-21T11:47:20.360Z"
//           },
//           {
//             "id": "fa7a5149-a52d-5a48-88a3-aeec5828bdb4",
//             "owner": "6f998f3c-772b-5479-bf08-d4d49a789096",
//             "content": {
//               "text": "I'm going to fork the router."
//             },
//             "date": "2017-08-28T16:34:54.733Z"
//           },
//           {
//             "id": "0a0036a3-ec5d-5b90-a8f7-7ea3a991eda1",
//             "owner": "751ff0ed-5c40-5f65-a3b4-4855a8474aeb",
//             "content": {
//               "text": "I'm thinking of attending a conference on transpiler management."
//             },
//             "date": "2017-05-04T14:18:30.893Z"
//           },
//           {
//             "id": "4ca23774-1684-56a3-a024-3107f9221dc5",
//             "owner": "751ff0ed-5c40-5f65-a3b4-4855a8474aeb",
//             "content": {
//               "text": "I've noticed a language that you could transpile."
//             },
//             "date": "2017-03-24T15:04:42.964Z"
//           },
//           {
//             "id": "4bb41d90-ad68-5e16-9b77-297d40993861",
//             "owner": "751ff0ed-5c40-5f65-a3b4-4855a8474aeb",
//             "content": {
//               "text": "Do you know how to merge the router?"
//             },
//             "date": "2017-04-03T02:25:58.030Z"
//           },
//           {
//             "id": "c01c246d-6f7b-5f51-b851-6fee8e646002",
//             "owner": "6f998f3c-772b-5479-bf08-d4d49a789096",
//             "content": {
//               "text": "I'm going to transpile the version."
//             },
//             "date": "2017-07-17T05:06:29.640Z"
//           },
//           {
//             "id": "f81694a0-e3b5-5c1f-b6d1-472731746e50",
//             "content": {
//               "text": "Note to self: debug the router."
//             },
//             "owner": "6f998f3c-772b-5479-bf08-d4d49a789096"
//           },
//           {
//             "id": "2fc5c7ed-b243-5740-9ae1-e783efdfc614",
//             "content": {
//               "text": "I'm going to merge the debugger."
//             },
//             "owner": "6f998f3c-772b-5479-bf08-d4d49a789096"
//           },
//           {
//             "id": "c93b3f42-6412-50c7-81cc-5ab3a2934e89",
//             "content": {
//               "text": "I'm going to port the repo."
//             },
//             "owner": "751ff0ed-5c40-5f65-a3b4-4855a8474aeb"
//           },
//           {
//             "id": "c8a005dd-c5e2-5df1-b869-5971ab63f782",
//             "content": {
//               "text": "The repo is amazing!"
//             },
//             "owner": "751ff0ed-5c40-5f65-a3b4-4855a8474aeb"
//           },
//           {
//             "id": "84c62967-30b6-5b85-9fc0-c85e8f0d4980",
//             "content": {
//               "text": "I've noticed a sprint that you could collate."
//             },
//             "owner": "6f998f3c-772b-5479-bf08-d4d49a789096"
//           },
//           {
//             "id": "daba5471-ca59-5071-a579-005628930258",
//             "content": {
//               "text": "Is there a repo I could desync?"
//             },
//             "owner": "6f998f3c-772b-5479-bf08-d4d49a789096"
//           },
//           {
//             "id": "2f91e609-3854-53de-ac09-865e65f1b543",
//             "content": {
//               "text": "Could you rebase the integer?"
//             },
//             "owner": "751ff0ed-5c40-5f65-a3b4-4855a8474aeb"
//           },
//           {
//             "id": "7ebf9bfc-3228-5771-a13e-c4ae2294b187",
//             "content": {
//               "text": "I'm thinking of attending a conference on module management."
//             },
//             "owner": "6f998f3c-772b-5479-bf08-d4d49a789096"
//           },
//           {
//             "id": "d47908c1-06f6-560f-9492-cd11ce25bc2e",
//             "content": {
//               "text": "The transpiler is amazing!"
//             },
//             "owner": "6f998f3c-772b-5479-bf08-d4d49a789096"
//           },
//           {
//             "id": "96538a55-33c6-5f7a-971a-0a327d650402",
//             "content": {
//               "text": "The language is amazing!"
//             },
//             "owner": "6f998f3c-772b-5479-bf08-d4d49a789096"
//           }
//         ],
//         "fetchStatus": "FETCHED"
//       },
//       {
//         "id": "4774c19f-583d-575d-a02e-a29ca95af8d1",
//         "name": "Andy John and Jackson Harrison's Private Chat",
//         "messages": [],
//         "fetchStatus": "NOT_FETCHED",
//         "participants": [
//           "75b4fa7b-0538-5c18-8297-c136dc7a5700",
//           "6f998f3c-772b-5479-bf08-d4d49a789096"
//         ]
//       },
//       {
//         "id": "da1667c9-3678-5e51-966c-44b239d064cf",
//         "name": "Group Chat",
//         "messages": [],
//         "fetchStatus": "NOT_FETCHED",
//         "participants": [
//           "14ac5775-9940-55c1-8192-ff78d1255068",
//           "177a9743-825e-595d-860d-ccee88880615",
//           "50a82efc-2358-5df6-aac0-3695413160ce",
//           "6f998f3c-772b-5479-bf08-d4d49a789096",
//           "751ff0ed-5c40-5f65-a3b4-4855a8474aeb",
//           "5505cbdd-0af0-5987-8acb-8472bf2040d3",
//           "87a3a388-f4d1-5020-a4a2-7afc3aed71b9",
//           "b884c6af-57bc-5d7d-9897-5a5dd46d63de",
//           "c3af8d53-e261-5af6-a97c-ff4fd07952ef",
//           "75b4fa7b-0538-5c18-8297-c136dc7a5700",
//           "202d1b8b-ab8b-5898-a207-994e07e9297b",
//           "f48379ae-e64d-58a5-866d-0a6cca7b3306"
//         ]
//       }
//     ],
//     "userInfo": [
//       {
//         "name": "Jackson Harrison",
//         "fetchStatus": "FETCHED",
//         "id": "6f998f3c-772b-5479-bf08-d4d49a789096",
//         "status": "ONLINE"
//       },
//       {
//         "name": "Jackson Harrison",
//         "fetchStatus": "FETCHED",
//         "id": "6f998f3c-772b-5479-bf08-d4d49a789096",
//         "status": "ONLINE"
//       },
//       {
//         "name": "Chuck Simmons",
//         "fetchStatus": "FETCHED",
//         "id": "751ff0ed-5c40-5f65-a3b4-4855a8474aeb",
//         "status": "ONLINE"
//       },
//       {
//         "name": "Chuck Combs",
//         "fetchStatus": "FETCHED",
//         "id": "5505cbdd-0af0-5987-8acb-8472bf2040d3",
//         "status": "AWAY"
//       },
//       {
//         "name": "Leonardo Starr",
//         "fetchStatus": "FETCHED",
//         "id": "14ac5775-9940-55c1-8192-ff78d1255068",
//         "status": "AWAY"
//       },
//       {
//         "name": "Jackson Simmons",
//         "fetchStatus": "FETCHED",
//         "id": "f48379ae-e64d-58a5-866d-0a6cca7b3306",
//         "status": "AWAY"
//       },
//       {
//         "name": "Leonardo Starr",
//         "fetchStatus": "FETCHED",
//         "id": "b884c6af-57bc-5d7d-9897-5a5dd46d63de",
//         "status": "OFFLINE"
//       },
//       {
//         "name": "Andy John",
//         "fetchStatus": "FETCHED",
//         "id": "75b4fa7b-0538-5c18-8297-c136dc7a5700",
//         "status": "AWAY"
//       },
//       {
//         "name": "Chuck Starr",
//         "fetchStatus": "FETCHED",
//         "id": "50a82efc-2358-5df6-aac0-3695413160ce",
//         "status": "OFFLINE"
//       }
//     ],
//     "activeChannel": "8b78f99b-a5f6-5f20-aa45-c35b6cc8c5c9"
//   };
const preloadedState = fromJS(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;

export const getPreloadedState = ()=>preloadedState;

