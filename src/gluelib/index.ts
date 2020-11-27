import { StoreInterface } from '../store/interface';

export abstract class GlueLib {
	abstract run(
		readStores: StoreInterface<any>[],
		writeStores: StoreInterface<any>[]
	): void;

	onceChanged(
		readStores: StoreInterface<any>[],
		writeStores: StoreInterface<any>[]
	) {
		this.onceStoresChanged(readStores).then(async (stores) => {
			await this.run(readStores, writeStores);
		});
	}

	private onceStoresChanged(stores: StoreInterface<any>[]) {
		return Promise.all(
			stores.map((store) => {
				return new Promise((resolve: (store: StoreInterface<any>) => void) => {
					store.onceChanged(() => {
						resolve(store);
					});
				});
			})
		);
	}
}
