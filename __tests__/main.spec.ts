const ScrapperError = require('../src/scrapperError');

describe('Extract info about free book', () => {
     beforeEach(() => jest.resetModules());

    it('success', async () => {
        const mockScrapper = jest.fn()
            .mockResolvedValueOnce({title: 'sample'})
            .mockRejectedValueOnce(new ScrapperError())
            .mockRejectedValueOnce(new Error());
        const mockNewBookNotify = jest.fn(() => Promise.resolve());
        const mockNoFreeBookNotify = jest.fn(() => Promise.resolve());
        const mockErrorNotify = jest.fn(() => Promise.resolve());

        jest.doMock("../src/scrapper", () => mockScrapper);
        jest.doMock('../src/webhooks', () => {
            return {
                newBookNotify: mockNewBookNotify,
                noFreeBookNotify: mockNoFreeBookNotify,
                errorNotify: mockErrorNotify,
            };
        });

        const main = require('../src/main');

        await main();
        expect(mockScrapper).toHaveBeenCalled();
        expect(mockNewBookNotify).toHaveBeenCalled();
    });

    it('error general', async () => {
        const mockScrapper = jest.fn()
            .mockRejectedValueOnce(new Error());
        const mockNewBookNotify = jest.fn(() => Promise.resolve());
        const mockNoFreeBookNotify = jest.fn(() => Promise.resolve());
        const mockErrorNotify = jest.fn(() => Promise.resolve());

        jest.mock("../src/scrapper", () => mockScrapper);
        jest.mock('../src/webhooks', () => {
            return {
                newBookNotify: mockNewBookNotify,
                noFreeBookNotify: mockNoFreeBookNotify,
                errorNotify: mockErrorNotify,
            };
        });

        const main = require('../src/main');

        await main();
        expect(mockScrapper).toHaveBeenCalled();
        expect(mockErrorNotify).toHaveBeenCalled();
    });
});
