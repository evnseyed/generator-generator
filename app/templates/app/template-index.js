const YoGenerator = require('yeoman-generator');

module.exports = class extends YoGenerator {
	constructor(args, opts) {
		super(args, opts);
	}

	async prompting() {
		this.answers = await this.prompt([
			{
				type: "input",
				name: "name",
				message: "Your module name (without \"generator-\" prefix): ",
			},
			{
				type: "input",
				name: "author",
				message: "Author: ",
				store: true,
			},
		]);
	}

	paths() {
		this.destinationRoot(this.generatorName);
	}

	writing() {
		const templatePath = path => this.templatePath(path);
		const destinationPath = path => this.destinationPath(path);

		const copy = (templatePath, destinationPath) => this.fs.copy(templatePath, destinationPath);
		const copyTpl = (templatePath, destinationPath, data) => this.fs.copyTpl(templatePath, destinationPath, data);

		const { answers } = this;
		const { name, author } = answers;

		copyTpl(
			templatePath('package.json'),
			destinationPath('package.json'),
			{ name, author }
		);
	}

	install() {
		// this.yarnInstall(['yeoman-generator']);
	}
};