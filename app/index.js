// This generator was generate using https://github.com/evnseyed/generator-generator

const YoGenerator = require('yeoman-generator');

module.exports = class extends YoGenerator {
	constructor(args, opts) {
		super(args, opts);
	}

	async prompting() {
		this.answers = await this.prompt([
			{
				type: "input",
				name: "generatorShortName",
				message: "Your generator name (without \"generator-\" prefix): ",
			},
			{
				type: "input",
				name: "author",
				message: "Author: ",
				store: true,
			},
		]);

		this.generatorName = `generator-${this.answers.generatorShortName}`;
	}

	paths() {
		this.destinationRoot(this.generatorName);
	}

	writing() {
		const templatePath = path => this.templatePath(path);
		const destinationPath = path => this.destinationPath(path);

		const copy = (templatePath, destinationPath) => this.fs.copy(templatePath, destinationPath);
		const copyTpl = (templatePath, destinationPath, data) => this.fs.copyTpl(templatePath, destinationPath, data);

		const { generatorName, answers } = this;
		const { author } = answers;


		copy(
			templatePath('app/template-index.js'),
			destinationPath('app/index.js'),
		)

		copy(
			templatePath('app/templates/package.json'),
			destinationPath('app/templates/package.json'),
		)

		copyTpl(
			templatePath('template-package.json'),
			destinationPath('package.json'),
			{ generatorName, author }
		);

		copy(
			templatePath('.gitignore'),
			destinationPath('.gitignore'),
		)
	}

	install() {
		this.yarnInstall(['yeoman-generator']);
	}
};