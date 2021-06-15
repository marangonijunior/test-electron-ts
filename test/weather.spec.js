const Application = require('spectron').Application
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const electronPath = require('electron')
const path = require('path')

chai.should()
chai.use(chaiAsPromised)

let app

describe('Application launch', function () {
  this.timeout(10000)

    beforeEach(function () {
        // console.log(path.join(__dirname, '..'))
        app = new Application({
            path: electronPath,
            args: [path.join(__dirname, '..')],
            startTimeout: 30000,
            waitTimeout: 30000,
        })
        return app.start()
    })

    beforeEach(function () {
        if (this.app && this.app.isRunning()) {
            chaiAsPromised.transferPromiseness = app.transferPromiseness
        }
    })

    afterEach(function () {
        if (app && app.isRunning()) {
            return app.stop()
        }
    })

    it('opens a window', async () => {

    });

})