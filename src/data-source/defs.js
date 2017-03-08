/**
 * @fileoverview Visflow data source defs.
 */

/** @inheritDoc */
visflow.DataSource.prototype.NODE_CLASS = 'data-source';

/** @inheritDoc */
visflow.DataSource.prototype.NODE_NAME = 'Data Source';

/** @inheritDoc */
visflow.DataSource.prototype.TEMPLATE =
  './dist/html/data-source/data-source.html';

/** @inheritDoc */
visflow.DataSource.prototype.PANEL_TEMPLATE =
  './dist/html/data-source/data-source-panel.html';

/** @protected @const {string} */
visflow.DataSource.SELECT_DATA_TEMPLATE =
  './dist/html/data-source/select-data.html';

/** @private @const {number} */
visflow.DataSource.HEIGHT_ = 30;

/** @inheritDoc */
visflow.DataSource.prototype.MIN_HEIGHT = visflow.DataSource.HEIGHT_;
/** @inheritDoc */
visflow.DataSource.prototype.MAX_HEIGHT = visflow.DataSource.HEIGHT_;

/** @protected @const {number} */
visflow.DataSource.DEFAULT_NUM_ATTRS = 1;

/**
 * Maximum data names length shown in the node.
 * @protected {number}
 */
visflow.DataSource.DATA_NAMES_LENGTH = 100;

/** @inheritDoc */
visflow.DataSource.prototype.defaultOptions = function() {
  return new visflow.options.DataSource({
    crossing: false,
    crossingName: 'attributes',
    crossingKeys: [],
    crossingAttrs: [],
    useServerData: true
  });
};
