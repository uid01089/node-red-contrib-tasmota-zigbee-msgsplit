
const helper = require("node-red-node-test-helper");
const lowerNode = require("../src/tasmota-zigbee-msgsplit.js");



describe('lower-case Node', function () {

    beforeEach(function (done) {
        helper.startServer(done);
    });

    afterEach(function (done) {
        helper.unload();
        helper.stopServer(done);
    });

    const flow = [
        {
            id: "TasmotaZigbeeMqqt", type: "tasmota-zigbee-msgsplit", name: "TasmotaZigbeeMqqtName",
            wires: [["AquaraTempSensor"]]
        },
        { id: "AquaraTempSensor", type: "helper" }

    ];



    const testMsg = {
        payload: '{"ZbReceived":{"0x6DBE":{"Device":"0x6DBE","Name":"TmpSens1","BatteryVoltage":3.005,"BatteryPercentage":100,"Voltage":3.005,"Battery":100,"Temperature":27.17,"Humidity":51.87,"Endpoint":1,"LinkQuality":39}}}'
    };

    it('should be loaded', function (done) {
        var flow = [{ id: "TasmotaZigbeeMqqt", type: "tasmota-zigbee-msgsplit", name: "TasmotaZigbeeMqqtName" }];
        helper.load(lowerNode, flow, function () {
            var underTestNode = helper.getNode("TasmotaZigbeeMqqt");
            underTestNode.should.have.property('name', 'TasmotaZigbeeMqqtName');
            done();
        });
    });

    it('should return Device', function (done) {
        helper.load(lowerNode, flow, function () {
            var helperNode = helper.getNode("AquaraTempSensor");
            var underTestNode = helper.getNode("TasmotaZigbeeMqqt");

            helperNode.on("input", function (msg) {

                msg.should.have.property('payload', '{"Device":"0x6DBE","Name":"TmpSens1","BatteryVoltage":3.005,"BatteryPercentage":100,"Voltage":3.005,"Battery":100,"Temperature":27.17,"Humidity":51.87,"Endpoint":1,"LinkQuality":39}');
                done();
            });
            underTestNode.receive(testMsg);
        });
    });

});