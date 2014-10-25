var debug       = require('debug')('amqp10-begin_frame'),
    util        = require('util'),

    constants   = require('./../constants'),
    Frame       = require('./frame');

/**
 * <h2>begin performative</h2>
 * <i>begin a Session on a channel</i>
 * <p>
 *           Indicate that a Session has begun on the channel.
 *         </p>
 * <h3>Descriptor</h3>
 * <dl>
 * <dt>Name</dt>
 * <dd>amqp:begin:list</dd>
 * <dt>Code</dt>
 * <dd>0x00000000:0x00000011</dd>
 * </dl>
 *
 * <table>
 * <tr><th>Name</th><th>Type</th><th>Mandatory?</th></tr><tr><td>remote-channel</td><td>ushort</td><td>false</td></tr>
 * <tr><td>&nbsp;</td><td colspan="2"><i>the remote channel for this Session</i>
 * <p>
 *             If a Session is locally initiated, the remote-channel MUST NOT be set. When an endpoint
 *             responds to a remotely initiated Session, the remote-channel MUST be set to the channel
 *             on which the remote Session sent the begin.
 *           </p></td></tr>
 * <tr><td>next-outgoing-id</td><td>transfer-number</td><td>true</td></tr>
 * <tr><td>&nbsp;</td><td colspan="2"><i>the transfer-id of the first transfer id the sender will send</i>
 * <p>See .</p>
 * <p>session-flow-control</p></td></tr>
 * <tr><td>incoming-window</td><td>uint</td><td>true</td></tr>
 * <tr><td>&nbsp;</td><td colspan="2"><i>the initial incoming-window of the sender</i>
 * <p>See .</p>
 * <p>session-flow-control</p></td></tr>
 * <tr><td>outgoing-window</td><td>uint</td><td>true</td></tr>
 * <tr><td>&nbsp;</td><td colspan="2"><i>the initial outgoing-window of the sender</i>
 * <p>See .</p>
 * <p>session-flow-control</p></td></tr>
 * <tr><td>handle-max</td><td>handle</td><td>false</td></tr>
 * <tr><td>&nbsp;</td><td colspan="2"><i>the maximum handle value that may be used on the Session</i>
 * <p>
 *             The handle-max value is the highest handle value that may be used on the Session.
 *             A peer MUST NOT attempt to attach a Link using a handle value outside the range that its
 *             partner can handle. A peer that receives a handle outside the supported range MUST close
 *             the Connection with the framing-error error-code.
 *           </p></td></tr>
 * <tr><td>offered-capabilities</td><td>symbol</td><td>false</td></tr>
 * <tr><td>&nbsp;</td><td colspan="2"><i>the extension capabilities the sender supports</i>
 * <p>
 *             A list of commonly defined session capabilities and their meanings can be found here:
 *             .
 *           </p>
 * <p>http://www.amqp.org/specification/1.0/session-capabilities</p></td></tr>
 * <tr><td>desired-capabilities</td><td>symbol</td><td>false</td></tr>
 * <tr><td>&nbsp;</td><td colspan="2"><i>the extension capabilities the sender may use if the receiver supports them</i></td></tr>
 * <tr><td>properties</td><td>fields</td><td>false</td></tr>
 * <tr><td>&nbsp;</td><td colspan="2"><i>session properties</i>
 * <p>
 *             The properties map contains a set of fields intended to indicate information about the
 *             session and its container.
 *           </p>
 * <p>
 *             A list of commonly defined session properties and their meanings can be found here:
 *             .
 *           </p>
 * <p>http://www.amqp.org/specification/1.0/session-properties</p></td></tr>
 * </table>
 *
 * @constructor
 */
var BeginFrame = function() {

};

BeginFrame.prototype.outgoing = function() {
    this._buildOutgoing({ channel: 0x0, frameType: constants.frame_type.amqp });
};

util.inherits(BeginFrame, Frame);