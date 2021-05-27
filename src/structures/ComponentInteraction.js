'use strict';

const Interaction = require('./Interaction');
const InteractionResponses = require('./interfaces/InteractionResponses');
const WebhookClient = require('../client/WebhookClient');

/**
 * Represents a message button interaction.
 * @extends {Interaction}
 */
class ComponentInteraction extends Interaction {
  // eslint-disable-next-line no-useless-constructor
  constructor(client, data) {
    super(client, data);

    /**
     * The message to which the button was attached
     * @type {?Message|Object}
     */
    this.message = data.message ? this.channel?.messages.add(data.message) ?? data.message : null;

    /**
     * The custom ID of the button which was clicked
     * @type {string}
     */
    this.customID = data.data.custom_id;

    /**
     * Whether the reply to this interaction has been deferred
     * @type {boolean}
     */
    this.deferred = false;

    /**
     * Whether this interaction has already been replied to
     * @type {boolean}
     */
    this.replied = false;

    /**
     * An associated webhook client, can be used to create deferred replies
     * @type {WebhookClient}
     */
    this.webhook = new WebhookClient(this.applicationID, this.token, this.client.options);
  }

  // These are here only for documentation purposes - they are implemented by InteractionResponses
  /* eslint-disable no-empty-function */
  defer() {}
  reply() {}
  fetchReply() {}
  editReply() {}
  deleteReply() {}
  followUp() {}
  deferUpdate() {}
  update() {}
}

InteractionResponses.applyToClass(ComponentInteraction);

module.exports = ComponentInteraction;
