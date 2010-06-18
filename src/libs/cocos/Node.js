var sys = require('sys'),
    obj = require('object'),
    Scheduler = require('./Scheduler').Scheduler,
    ActionManager = require('./ActionManager').ActionManager,
    ccp = require('geometry').ccp;

exports.Node = obj.Object.extend({
    visible: true,
    position: null,
    parent: null,
    contentSize: null,
    zOrder: 0,
    anchor: null,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    isRunning: false,

    _children: null,

    init: function() {
        this.contentSize = {width: 0, height: 0};
        this.anchor = ccp(0.5, 0.5);
        this.position = ccp(0,0);
        this._children = [];
    },

    addChild: function(node) {
        console.log('Adding child node:', node);
        node.set('parent', this);
        this._children.push(node);
    },

    draw: function(context) {
        // All draw code goes here
    },

    onEnter: function() {
        this.resumeSchedulerAndActions();
        this.set('isRunning', true);
    },
    onExit: function() {
        this.pauseSchedulerAndActions();
        this.set('isRunning', false);
    },
    resumeSchedulerAndActions: function() {
        Scheduler.get('sharedScheduler').resumeTarget(this);
        ActionManager.get('sharedManager').resumeTarget(this);
    },
    pauseSchedulerAndActions: function() {
        Scheduler.get('sharedScheduler').pauseTarget(this);
        ActionManager.get('sharedManager').pauseTarget(this);
    },

    visit: function(context) {
        if (!this.visible) {
            return;
        }

        context.save();

        this.transform(context);

        // Draw background nodes
        sys.each(this._children, function(child, i) {
            if (child.zOrder < 0) {
                child.visit(context);
            }
        });

        this.draw(context);

        // Draw foreground nodes
        sys.each(this._children, function(child, i) {
            if (child.zOrder >= 0) {
                child.visit(context);
            }
        });

        context.restore();
    },
    transform: function(context) {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.get('rotation'));
        context.translate(Math.round(-this.anchor.x * this.contentSize.width), Math.round(-this.anchor.y * this.contentSize.height));
 
    },

    runAction: function(action) {
        ActionManager.get('sharedManager').addAction({action: action, target: this, paused: this.get('isRunning')});
    }
});
