const chalk = require("chalk");

const preset_class = {
	info: chalk.rgb(170,170,170).bold("[INFO]"),
	connect: chalk.rgb(170,170,170).bold("[CONNECT]"),
	success: chalk.rgb(0,204,0).bold("[SUCCESS]"),
	error: chalk.rgb(255,0,0).bold("[ERROR]")
}

const preset_color = {
	host: chalk.rgb(204,255,51).bold,
	error: chalk.rgb(255,80,0).bold,
	path: chalk.rgb(238,238,238).bold
}

const fixChalkStyleString = chalkStyleString => {
	chalkStyleString = chalkStyleString.replace(
		eval('/(' + ([
			"bold"
		]).join("|") + ')(\.|$)/g'),
		function(origin,style){
			return style + "()";
		}
	);

	return chalkStyleString;
}

const handleChalkStyle = (chalkStyle,text) => {
	let chalkFunction;

	switch(typeof chalkStyle){
		case "string":
		case "object":
			if(typeof chalkStyle == "string"){
				chalkStyle = chalkStyle.split(".");
			}
			for(var index in chalkStyle){
				chalkStyle[index] = fixChalkStyleString(chalkStyle[index]);
			}
			var lastIndex = chalkStyle.length - 1;
			chalkStyle[lastIndex] = chalkStyle[lastIndex].replace(/\(\)$/,"");
			chalkStyle = chalkStyle.join(".");
			eval(`chalkFunction = chalk.${chalkStyle}(\`${text}\`)`);
			break;
		
		case "function":
			chalkFunction = chalkStyle(text);
			break;
		
		default:
			throw `The data type of chalk style must be object, string or function.`;
			break;
	}

	return chalkFunction;
}

class log{
	head = false;
	stack = [];
	constructor(){
		if(arguments.length == 1){
			let type = arguments[0].toLocaleLowerCase();

			if(type in preset_class){
				this.head = preset_class[type];
			}else{
				throw `There is no preset scheme named "${type}", please try adding chalk style yourself.`;
			}
		}else{
			this.head = handleChalkStyle(arguments[0],arguments[1]);
		}
	}
	add(){
		let returnFunction = { output: this.output,add: this.add };

		if(arguments.length == 1){
			this.stack.push(arguments[0]);
		}else{
			let text = arguments[1];

			if(typeof arguments[0] == "string"){
				let type = arguments[0].toLocaleLowerCase();

				let isStyle = true;
				let chalkStyles = type.split(".");
				for(var i in chalkStyles){
					let chalkStyle = chalkStyles[i].replace(/\(.*?\)$/,"");
					if(!(chalkStyle in chalk)){
						isStyle = false;
						break;
					}
				}

				if(!isStyle){
					if(type in preset_color){
						this.stack.push(preset_color[type](text));
					}else{
						throw `There is no preset scheme named "${type}", please try adding chalk style yourself.`;
					}
					
					returnFunction = Object.assign(returnFunction,{
						head: this.head,
						stack: this.stack
					});
					return returnFunction;
				}
			}

			returnFunction = Object.assign(returnFunction,{
						
			});
			this.stack.push(handleChalkStyle(arguments[0],arguments[1]));
		}

		returnFunction = Object.assign(returnFunction,{
			head: this.head,
			stack: this.stack
		});
		return returnFunction;
	}
	output(){
		let messageStack = [];
		if(this.head !== false){
			messageStack.push(this.head);
		}
		for(var i in this.stack){
			messageStack.push(this.stack[i]);
		}
		console.log(messageStack.join(" "));
	}
}

module.exports = log;
