var preload = require("openui5-preload");

preload({
    resources: {
        cwd: '../webapp',
        prefix: 'com/glossary',
        expand: true,
        src: [
            "**/*.js",
            "**/*.html",
            "**/*.json",
            "**/*.fragment.html",
            "**/*.fragment.xml",
            "**/*.fragment.json",
            "**/*.view.html",
            "**/*.view.xml",
            "**/*.view.json",
            "**/*.properties",
            "manifest.json"
        ]
    },
    dest: '../webapp',
    compress: true,
    verbose: false,
    components: true
});