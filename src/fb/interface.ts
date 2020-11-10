export abstract class GlueLib<InputData, OutputData>
	implements GlueLibInterface {
	abstract getInputClassName(): string;
	abstract getOutputClassName(): string;
	abstract run(options: InputData): OutputData;
}

export interface GlueLibInterface {
	getInputClassName(): string;
	getOutputClassName(): string;
	run(params: any): any;
}

class DownloadInputDefinition {
	public url?: string;
	public username?: string;
	public password?: string;
}

class DownloadOutputDefinition {
	public data?: Buffer;
	public encoding?: 'base64';
}

class GlueLibDownloadToBuffer extends GlueLib<
	DownloadInputDefinition,
	DownloadOutputDefinition
> {
	getInputClassName() {
		return DownloadInputDefinition.name;
	}

	getOutputClassName() {
		return DownloadOutputDefinition.name;
	}

	run(input: DownloadInputDefinition): DownloadOutputDefinition {
		// nimm die url
		// downloade den stuff
		// mach ein Output draus
		const returnValue: DownloadOutputDefinition = {
			data: Buffer.from('bla'),
		};
		return returnValue;
	}
}

class PluginFactory {
	get(type: string): GlueLibInterface {
		switch (type) {
			case GlueLibDownloadToBuffer.name:
				return new GlueLibDownloadToBuffer();
			default:
				// this is wrong
				return new GlueLibDownloadToBuffer();
		}
	}
}

interface ConfigEntry {
	type: string;
	options: object;
}

class Dispatcher {
	private factory: PluginFactory;

	constructor(private config: ConfigEntry[]) {
		this.factory = new PluginFactory();
	}

	checkChain() {
		let inputDefinition: string | null = null;
		let outputDefinition: string | null = null;
		this.config.forEach((entry: ConfigEntry) => {
			const concreteLib = this.factory.get(entry.type);
			inputDefinition = concreteLib.getInputClassName();
			if (!!outputDefinition && inputDefinition !== outputDefinition) {
				throw new Error('incompatible chain');
			}
			outputDefinition = concreteLib.getOutputClassName();
		});
		return true;
	}

	start() {
		let result = this.config[0].options;
		this.config.forEach((entry: ConfigEntry) => {
			const concreteLib = this.factory.get(entry.type);
			result = concreteLib.run(result);
		});
		return result;
	}
}

const dispatcher = new Dispatcher([
	{
		type: 'GlueLibDownloadToBuffer',
		options: {
			url: 'http://example.com',
		},
	},
	{
		type: 'GlueLibBufferToBucket',
		options: {},
	},
]);

dispatcher.checkChain(); // passen die IO zusammen
dispatcher.start();
