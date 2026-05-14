export default function server(serverInstance, baseDir) {
    serverInstance.init({
        server: {
            baseDir,
        },
        logLevel: "info",
        cors: true,
        notify: true,
        open: false,
        reloadOnRestart: true,
        port: 3000,
    });
}