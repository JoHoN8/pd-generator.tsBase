//<%= ngapp %> to add text in file
'use strict';
var generator = require('yeoman-generator'),
    chalk = require('chalk'),
    yosay = require('yosay'),
    includes = function (ary, lib) {
        var val = ary.indexOf(lib);

        return val > -1;
    };

module.exports = generator.extend({
    constructor: function(){
        generator.apply(this, arguments);
        
        this.includes = includes;
        // this.argument('appname', { type: String, required: true });
        // this.appname = _.kebabCase(this.appname);
        
    },  
    initializing: function(){
    },
    prompting: function(){
        var self = this;

        this.log(yosay(chalk.yellow('Create an ES6 project')));
            
        //var done = this.async();
        return this.prompt([{
            type: 'input',
            name: 'projectName',
            message: 'Provide project name',
            default: 'siteApp'
        },
        {
            type: 'checkbox',
            name: 'jslibs',
            message: 'Which JS libraries would you like to include?',
            choices: [
                {
                    name: 'axios',
                    value: 'axios',
                    checked: true
                },
                {
                    name: 'jQuery',
                    value: 'jquery',
                    checked: false
                },
                {
                    name: 'lodash',
                    value: 'lodash',
                    checked: false 
                },
                {
                    name: 'Moment.js',
                    value: 'momentjs',
                    checked: false
                },
                {
                    name: 'pd-spUtil.js',
                    value: 'pdsputil',
                    checked: false
                },
                {
                    name: 'pd-spServerAjax.js',
                    value: 'pdspserverajax',
                    checked: false
                },
                {
                    name: 'pd-spServerJsom.js',
                    value: 'spserverjsom',
                    checked: false
                },
                {
                    name: 'pd-appUtil.js',
                    value: 'pdapputil',
                    checked: false
                }
            ]
        }]).then(function(answers){
            self.log(answers);
            self.projectName = answers.projectName;
            //self.config.set('appname', answers.projectName);
            // self.config.save();
            
            self.includeAxios = self.includes(answers.jslibs, 'axios');
            self.includeJquery = self.includes(answers.jslibs, 'jquery');
            self.includeLodash = self.includes(answers.jslibs, 'lodash');
            self.includeMoment = self.includes(answers.jslibs, 'momentjs');             
            self.includesputil = self.includes(answers.jslibs, 'pdsputil');             
            self.includespserverajax = self.includes(answers.jslibs, 'pdspserverajax');             
            self.includespserverjsom = self.includes(answers.jslibs, 'pdspserverjson');             
            self.includeapputil = self.includes(answers.jslibs, 'pdapputil');             
            //done(); 
        });
            
    },
    configuring: function(){
    },
    writing: {
        packageJSON: function(){
            var packageFile = {
                name: this.projectName,
                version: "1.0.0",
                description: this.desc,
                main: "app.ts",
                scripts: {
                    "devBuild": "webpack --config ./webpackConfigs/webpack.config.dev.js",
                    "prodBuild": "webpack --config ./webpackConfigs/webpack.config.prod.js"
                },
                author: this.author,
                license: "ISC",
                dependencies: {},
                devDependencies: {}
            };

            //dependencies
            if(this.includeAxios) {packageFile.dependencies["axios"] = "^0.17.0";}
            if(this.includeJquery) {packageFile.dependencies["jquery"] = "2.2.4";}
            if(this.includeLodash) {packageFile.dependencies["lodash"] = "^4.0.0";}
            if(this.includeMoment) {packageFile.dependencies["moment"] = "^2.0.0";}
            if(this.includesputil) {packageFile.dependencies["pd-sputil"] = "^2.0.0";}
            if(this.includespserverajax) {packageFile.dependencies["pd-spserverajax"] = "^2.0.0";}
            if(this.includespserverjsom) {packageFile.dependencies["pd-spserverjsom"] = "^1.0.0";}
            if(this.includeapputil) {packageFile.dependencies["pd-apputil"] = "^1.0.0";}
            //packageFile.dependencies["babel-polyfill"] = "latest";
            
            //devDependencies
            packageFile.devDependencies["webpack"] = "^3.0.0";
            packageFile.devDependencies["clean-webpack-plugin"] = "^0.1.17";
            packageFile.devDependencies["html-webpack-plugin"] = "^2.30.1";
            packageFile.devDependencies["css-loader"] = "0.28.7";
            packageFile.devDependencies["sass-loader"] = "^6.0.6";
            packageFile.devDependencies["file-loader"] = "^1.1.5";
            packageFile.devDependencies["style-loader"] = "0.19.0";
            packageFile.devDependencies["ts-loader"] = "^3.0.0";
            packageFile.devDependencies["extract-text-webpack-plugin"] = "^3.0.0";
            packageFile.devDependencies["typescript"] = "^2.0.0";
            //packageFile.devDependencies["tslint"] = "latest";
            packageFile.devDependencies["npm-run-all"] = "^4.1.1";

            this.fs.writeJSON(
                this.destinationPath('package.json'),
                packageFile
            );
        },
        appStaticFiles: function(){
            // this.copy('_favicon.ico', 'src/favicon.ico');
            this.fs.copy(
                this.templatePath('gitignore'),
                this.destinationPath('.gitignore')
            );
            this.fs.copy(
                this.templatePath('tslint.json'),
                this.destinationPath('tslint.json')
            );
            this.fs.copy(
                this.templatePath('webpackConfigs/**'),
                this.destinationPath('webpackConfigs/')
            );
            this.fs.copy(
                this.templatePath('tsconfig.json'),
                this.destinationPath('tsconfig.json')
            );
        },
        styleSheets: function() {
            this.fs.copy(
                this.templatePath('app/_main.scss'),
                this.destinationPath('src/styleSheets/main.scss')
            );
        },
        scripts: function(){
            this.fs.copyTpl(
                this.templatePath('app/_app.ts'),
                this.destinationPath('src/scripts/app.ts'),
                {
                    projectName: this.projectName
                }
            );
        },
        html: function(){
            this.fs.copy(
                this.templatePath('_index.html'),
                this.destinationPath('src/index.html')
            );
        }
    },
    conflicts: function(){
    },
    install: function(){
        //this.bowerInstall();
        this.npmInstall();
    },
    end: function(){
        this.log(chalk.yellow.bold('Installation successful!'));
    }
});