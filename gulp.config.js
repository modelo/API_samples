 /**
 * Contains the config information for our gulp.js file, gulp.build.js file, and
 * our karma test runner.
 */

// Order is important
const externalJsDependencies = [
     "object-assign-polyfill.js",
     "angular.js",
     "ua-parser.js",
     "raven-src.js",
     "angular-ui-router.js",
     "angular-cookies.js",
     "lodash.custom.js",
     "jquery.js",
     "ngDialog.js",
     "ng-file-upload.js",
     "slick.js",
     "TweenLite.js",
     "ScrollToPlugin.js",
     "angular-messages.js",
     "ui-router-tabs.js",
     "ng-tags-input.js",
     "timeAgo.js",
     "jszip.js",
     "q-spread.js",
     "jquery.nicescroll.js",
     "angular-stripe-checkout.js",
     "ngDraggable.js",
     "modernizr.js",
     "angular-sanitize.js",
     "swipe-edited.js",
     "mentio.js",
     "angular-q-all-settled.js",
     "angular-payments.js",
     "cropper.js",
     "angular-load.js",


     "moment.js",
     "moment-zh-cn.js",
     "moment-timezone-with-data.js",
     
     "ng-intl-tel-input/intl-tel-input.js",
     "ng-tags-input.js",
     "ng-intl-tel-input/ng-intl-tel-input.js",
     "angular-translate.js",
     "angular-translate-loader-url.js",
     "angular-translate-loader-static-files.js",

     // order is important
     "messageformat.js",
     "angular-translate-interpolation-messageformat.js",'' +

     "pdf.js",

     // temp
     "stateEvents.js",

     // Analytics Stuff
     "angulartics.js",
     "angulartics-mixpanel.min.js"
].map(lib => `app/assets/external-libraries/${lib}`);

const cachedTemplatesFile = "app/assets/temp/templates.js";

const modelo3dLibrary = [
    "app/model/modelo3d/glMatrix.js",
    "app/model/modelo3d/lz-string.js",
    "app/model/modelo3d/webgl-utils.js",
    "app/model/modelo3d/modelo3d.js",
    "app/model/modelo3d/m3d.js"
];

const modelo3dWorker = [
    "!app/model/modelo3d/node_modules",
    "app/model/modelo3d/**/*.worker.js"
];


// All HTML templates except index
const htmlTemplates = [
    "app/**/*.html",
    "!app/assets/**/*.html",
    "!app/index.html"
];

const sassFiles = [
    "app/**/*.scss",
    "app/*.scss"
];

const webpackEntry = "./app/webpack-entry.ts";

const testSpecs = [
    "typings/index.d.ts",
    "tests/interfaces.ts",
    "tests/test-helpers.ts",
    "tests/mocks.ts",

    // Order is important
    "tests/mocks/permissions-mocks.ts",
    "tests/mocks/user-mocks.ts",
    "tests/mocks/projects-mocks.ts",
    "tests/mocks/company-mocks.ts",
    "tests/mocks/asset-mocks.ts",

    "tests/custom-matchers.js",
    "app/**/*.spec.js",
    "app/*.spec.js",
    "app/**/*.spec.ts",
    "app/*.spec.ts",
    "!app/model/modelo3d/**/*.js"
];

const compiledFrontendCode = "app/assets/js/modelo.js";

const svgAssets = "app/assets/images/svg/*.svg";


// Handles gulp-plumber error callbacks
const onError = {
    errorHandler: error => {
        const typescriptError = isTypescriptError(error);
        const isStyleLint = typeof error === "object" && error.plugin === "gulp-stylelint";
        const gulpSassError = typeof error === "object" && error.plugin === "gulp-sass";

        //gulpPlugins.util.beep();

        if (gulpSassError) {
            console.log(error.message);
        }
        // Lets not output errors for plugin that already report their errors
        else if (!typescriptError && !isStyleLint) {
            console.log(error);
        }
    }
};


const BUILD_ENV_VARS = {
    production: {
        environment: "production",
        buildFolder: "./build",
        language: "en",
        baseUrl: "https://app.modelo.io",
        isChinaBuild: false,
        isElectron: false
    },
    develop: {
        environment: "develop",
        buildFolder: "./build",
        language: "en",
        baseUrl: "https://release-app.modelo.io",
        isChinaBuild: false,
        isElectron: false
    },
    developCn: {
        environment: "developCn",
        buildFolder: "./build",
        language: "zh",
        baseUrl: "http://develop.modeloapp.com",
        isChinaBuild: true,
        isElectron: false
    },
    productionCn: {
        environment: "productionCn",
        buildFolder: "./build",
        language: "zh",
        baseUrl: "https://app.modeloapp.com",
        isChinaBuild: true,
        isElectron: false
    },
    electron: {
        environment: "production",
        buildFolder: "./build",
        language: "en",
        baseUrl: "https://app.modelo.io",
        isChinaBuild: false,
        isElectron: true
    }
};


function isTypescriptError(error) {

    if (typeof error !== "object") {
        return false;
    }
    else if (error.tsFile) {
        return true;
    }
    else if (error.name && error.name === "TypeScript error") {
        return true;
    }
    else {
        return false;
    }
}

module.exports = {

    onError: onError,

    expressPort: 4000,

    liveReloadPort: 4002,

    BUILD_ENV_VARS,

    htmlIndexTemplate: "app/index.html",

    preRenderTemplate: "prerender/index.html",

    modelo3dShaders: "app/model/modelo3d/02resource/shaders/*",

    htmlTemplates: htmlTemplates,

    cachedTemplatesFile: cachedTemplatesFile,

    webWorkers: "app/assets/web-workers/**/*",

    serviceWorker: "app/service-worker.js",

    compiledFrontendCode: compiledFrontendCode,

    webpackEntry,

    styles: {
        entryFile: "app/assets/sass/styles.scss",

        watchFiles: sassFiles,

        // Component scoped styles are the only styles found outside of assets/sass directory
        componentFiles: [].concat(
            sassFiles,
            "!app/assets/**/*.scss",
            "!app/assets/*.scss"
        )
    },


    modelo3dJs: {
        library: modelo3dLibrary,
        worker: modelo3dWorker
    },


    externalJs: {

        local: [].concat(
            externalJsDependencies
        ),

        // 3D code is bundled with external dependencies on the server
        server: [].concat(
            externalJsDependencies,
            modelo3dLibrary
        ),

        // Currently not used. Only used for render team to debug on server.
        serverDebug3d: [].concat(
            externalJsDependencies,
            modelo3dLibrary
        ),

        chinaServer: [].concat(
            "app/assets/external-libraries/jweixin-1.2.0.js",
            externalJsDependencies,
            modelo3dLibrary
        )
    },

    svgAssets: svgAssets,

    // Files that live reload should watch for changes
    liveReloadWatch: [
        "app/index.html",
        "app/assets/css/styles.css",
        "app/assets/js/modelo.js",
        "app/assets/js/modelo3d.js"
    ],

    // Our specs
    testSpecs: testSpecs,

    stylelintSettings: {
        reporters: [
            {
                formatter: "string",
                console: true
            }
        ]
    },

    svgifySettings: {
        src: svgAssets,
        scssOutput: "app/assets/sass/compiled-svgs",
        cssOutput: "app/assets/css",
        styleTemplate: "_icon_gen.scss.mustache",
        svgoOptions: {
            enabled: true
        }
    },

    typescriptOverride: {
        "alwaysStrict": false,
        "forceConsistentCasingInFileNames": false,
        "noImplicitThis": false,
        "noImplicitAny": false,
        "strictNullChecks": false,
        "noImplicitReturns": false,
        "noUnusedParameters": false,
        "noEmitHelpers": true
    },

    karmaFiles: {
        local: [].concat(
            externalJsDependencies,

            // Libraries
            "tests/external-libraries/angular-mocks.js",
            "tests/external-libraries/jasmine-jquery.js",
            "tests/external-libraries/es6-promise.auto.js",

            // Runtime hacks
            "tests/chrome-headless-patches.js",

            // Front-end code
            "app/assets/js/modelo.js",

            // Compiled tests
            "tests/compiled/test-specs.js"
        ),
        ci: [
            "build/assets/js/external-libraries.js",

            // Libraries
            "tests/external-libraries/angular-mocks.js",
            "tests/external-libraries/jasmine-jquery.js",
            "tests/external-libraries/es6-promise.auto.js",

            // Runtime hacks
            "tests/chrome-headless-patches.js",

            // Front-end code
            "build/assets/js/modelo.js",

            // Compiled tests
            "tests/compiled/test-specs.js"
        ]
    },

    karmaConfig: {
        basePath: "",
        frameworks: ["jasmine", "jasmine-sinon"],
        preprocessors: {},
        reporters: ["spec"],
        specReporter: {
            maxLogLines: 20,             // limit number of lines logged per test
            suppressErrorSummary: true,  // do not print error summary
            suppressFailed: false,       // do not print information about failed tests
            suppressPassed: true,        // do not print information about passed tests
            suppressSkipped: true        // do not print information about skipped tests
        },
        customLaunchers: {
            ModeloHeadlessChrome: {
                base: "Chrome",
                flags: [
                    "--disable-gpu",
                    "--headless",
                    "--disable-extensions",
                    "--remote-debugging-port=9223"
                ]
            }
        },
        port: 9876,
        colors: true,
        autoWatch: true,
        browsers: ["ModeloHeadlessChrome"],
        plugins: [
            "karma-spec-reporter",
            "karma-chrome-launcher",
            "karma-jasmine",
            "karma-jasmine-sinon"
        ],
        singleRun: false,
        reportSlowerThan: 550,
        retryLimit: 10,
        browserDisconnectTimeout: 7000,
        browserDisconnectTolerance: 5,
        browserNoActivityTimeout: 30000
    }
};
