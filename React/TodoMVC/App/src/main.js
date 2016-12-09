// require.js looks for the following global when initializing
require.config({
    paths: {
        "classnames": "../../node_modules/classnames/index",
        "eventemitter3": "../../node_modules/eventemitter3/index",
        "react": "../../node_modules/react/dist/react",
        "react-dom": "../../node_modules/react-dom/dist/react-dom",
        "flux": "../../node_modules/flux/dist/flux"
    },
    shim: {
        "react": { exports: "React" },
        "react-dom": { exports: "ReactDom" },
        "eventemitter3": { exports: "EventEmitter" }
    },
    deps: ['app']
});