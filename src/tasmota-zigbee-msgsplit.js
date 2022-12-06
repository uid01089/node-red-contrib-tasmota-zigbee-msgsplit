"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const func = (RED) => {
    const tasmotaZigbeeMsgSplit = function (config) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const node = this;
        RED.nodes.createNode(node, config);
        /**
         * Nodes register a listener on the input event
         * to receive messages from the up-stream nodes in a flow.
        */
        node.on("input", function (msg, send, done) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    // For maximum backwards compatibility, check that send exists.
                    // If this node is installed in Node-RED 0.x, it will need to
                    // fallback to using `node.send`
                    // eslint-disable-next-line prefer-spread, prefer-rest-params
                    send = send || function () { node.send.apply(node, arguments); };
                    /**
                     * {"ZbReceived":
                     *  {"0x6DBE":
                     *      {   "Device":"0x6DBE",
                     *          "Name":"TmpSens1",
                     *          "ModelId":"lumi.sensor_ht",
                     *          "Endpoint":1,
                     *          "LinkQuality":149
                     *      }
                     *  }
                     * }
                     *
                     * "{"ZbReceived":
                     *  {"0x6DBE":
                     *      {   "Device":"0x6DBE",
                     *          "Name":"TmpSens1",
                     *          "BatteryVoltage":3.025,
                     *          "BatteryPercentage":100,
                     *          "Voltage":3.025,
                     *          "Battery":100,
                     *          "Temperature":24.46,
                     *          "Humidity":48.76,
                     *          "Endpoint":1,
                     *          "LinkQuality":149
                     *      }
                     *  }
                     * }"
                     */
                    const zbReceived = JSON.parse(msg.payload)["ZbReceived"];
                    if (zbReceived !== undefined && zbReceived !== null) {
                        for (const messageId in zbReceived) {
                            const message = { payload: JSON.stringify(zbReceived[messageId]) };
                            send([message]);
                        }
                    }
                }
                catch (e) {
                    console.error(e);
                }
                // Once finished, call 'done'.
                // This call is wrapped in a check that 'done' exists
                // so the node will work in earlier versions of Node-RED (<1.0)
                if (done) {
                    done();
                }
            });
        });
        /**
         * Whenever a new flow is deployed, the existing nodes are deleted.
         * If any of them need to tidy up state when this happens, such as
         * disconnecting from a remote system, they should register a listener
         * on the close event.
        */
        node.on('close', function (removed, done) {
            if (removed) {
                // This node has been disabled/deleted
            }
            else {
                // This node is being restarted
            }
            done();
        });
    };
    RED.nodes.registerType("tasmota-zigbee-msgsplit", tasmotaZigbeeMsgSplit);
};
module.exports = func;
//# sourceMappingURL=tasmota-zigbee-msgsplit.js.map