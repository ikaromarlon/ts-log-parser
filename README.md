## LogParser

A simple command line application built uppon Node.js with TypeScript.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![CI](https://github.com/ikaromarlon/ts-log-parser/actions/workflows/main.yml/badge.svg?branch=master)](https://github.com/ikaromarlon/ts-log-parser/actions/workflows/main.yml)
[![Coverage Status](https://coveralls.io/repos/github/ikaromarlon/ts-log-parser/badge.svg?branch=master)](https://coveralls.io/github/ikaromarlon/ts-log-parser?branch=master)

The application should find all the log messages with the level error and print them into the output file.

#### Techniques and Patterns

- OOD principles (DRY, SLAP, SOLID, etc)
- Clean Architecture
- Unity testing
- TDD
- [Conventional Commits](https://www.conventionalcommits.org/)

#### Technologies

- [NodeJS 18+](https://nodejs.org/dist/latest-v18.x/docs/api/)
- [TypeScript](https://www.typescriptlang.org/)

#### Dependecies

- [command](https://www.npmjs.com/package/command)

#### Expected Usage

```bash
node parser.js --input ./app.log --output ./errors.json
```

#### Input Format

```text
<ISO Date> - <Log Level> - {"transactionId: "<UUID>", "details": "<message event/action description>", "err": "<Optional, error description>", ...<additional log information>}
```

#### Input Example

```text
2044-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}
2021-08-09T02:12:51.254Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"About to request the user information","userId": 10}
2021-08-09T02:12:51.254Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"About to request user orders list","userId": 10}
2021-08-09T02:12:51.255Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"Service is started"}
2021-08-09T02:12:51.257Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"About to request the user information","userId": 16}
2021-08-09T02:12:51.257Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"User information is gathered","user":{"id":10,"name":"Alice"}}
2021-08-09T02:12:51.258Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"About to request user orders list","userId":16}
2021-08-09T02:12:51.259Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Cannot find user orders list","code": 404,"err":"Not found"}
2021-08-09T02:12:51.259Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"User information is retrieved","user": {"id": 16, "name": "Michael"}}
2021-08-09T02:12:51.262Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"User information is retrieved","user":{"id":16,"orders":[{"id":472,"items":{"id":7,"price":7.12}}]}}
2021-08-09T02:12:51.264Z - warn - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service finished with error","code":404,"err":"Cannot find user orders list"}
2021-08-09T02:12:51.265Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"Service is successfully finished"}
```

#### Output Format

```text
[{"timestamp": <Epoch Unix Timestamp>, "loglevel": "<loglevel>", "transactionId: "<UUID>", "err": "<Error message>" }]
```

#### Output Example

```text
[{"timestamp":1628475171259,"loglevel":"error","transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","err":"Not found"}]
```
