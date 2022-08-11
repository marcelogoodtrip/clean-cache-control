class LocalSavePurchases {
    constructor (private readonly cacheStore: CacheStore) {}

    async save(): Promise<void> {
        this.cacheStore.delete()
    }
}

interface CacheStore {
    delete: () => void
}

class CacheStoreSpy implements CacheStore {
    deleteCallsCount = 0

    delete(): void {
        this.deleteCallsCount++
    }
}

type SutTypes = {
    sut: LocalSavePurchases
    cacheStore: CacheStoreSpy
}

const makeSUt = (): SutTypes => {
    const cacheStore = new CacheStoreSpy()
    const sut = new LocalSavePurchases(cacheStore)
    return {
        sut,
        cacheStore
    }
}

describe('LocalSavePurchases', () => {

    test('Shoud not delete cache on sut.init', () => {
        const { cacheStore } = makeSUt()
        expect(cacheStore.deleteCallsCount).toBe(0)
    });

    test('Shoud delete old cache on sut.init', async () => {
        const { cacheStore, sut } = makeSUt()
        await sut.save()
        expect(cacheStore.deleteCallsCount).toBe(1)
    });


});