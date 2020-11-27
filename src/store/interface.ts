export interface StoreInterface<T> {
	get(): T;
	set(data: Partial<T>): T;
	onUpdated(callback: (previousData: T, newData: T) => void): void;
	onceUpdated(callback: (previousData: T, newData: T) => void): void;
	onChanged(callback: (previousData: T, newData: T) => void): void;
	onceChanged(callback: (previousData: T, newData: T) => void): void;
}
