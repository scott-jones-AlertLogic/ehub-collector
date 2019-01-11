/* -----------------------------------------------------------------------------
 * @copyright (C) 2018, Alert Logic, Inc
 * @doc
 *
 * The function captures Azure activity logs exported via Azure Monitor service into Event hub
 * 
 * A Log Profile currently only allows you to select an Event Hubs namespace, 
 * in which an event hub is created with the name 'insights-operational-logs.' 
 * It is not yet possible to specify your own event hub name in a Log Profile.
 * 
 * https://docs.microsoft.com/en-us/azure/azure-monitor/platform/stream-monitoring-data-event-hubs
 *
 * @end
 * -----------------------------------------------------------------------------
 */

const ehubCollector = require('../common/ehub_collector');
const parse = require('../common/parse');

var formatActivityLogRecord = function(msg) {
    const ts = parse.getMsgTs(msg);
    const typeId = parse.getMsgTypeId(msg);
    return {
        messageTs: ts.sec,
        priority: 11,
        progName: 'EHubActivityLogs',
        pid: undefined,
        message: JSON.stringify(msg),
        messageType: 'json/azure.ehub',
        messageTypeId: typeId,
        messageTsUs: ts.usec
    };
};

module.exports = function (context, eventHubMessages) {
    return ehubCollector(context, eventHubMessages, formatActivityLogRecord);
};

