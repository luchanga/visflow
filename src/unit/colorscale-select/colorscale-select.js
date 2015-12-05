/**
 * @fileoverview VisFlow color scale select user interface.
 */

'use strict';

/**
 * @param {{
 *   container: !jQuery
 * }} params
 * @constructor
 * @extends {visflow.Select}
 */
visflow.ColorScaleSelect = function(params) {
  _(params).extend({
    list: visflow.scales.getColorScales(),
    allowClear: false
  });
  visflow.ColorScaleSelect.base.constructor.call(this, params);

  this.container_.children('.select').addClass('color-scale');

  /**
   * Mapping from scale text to scale item, so that we can add gradientDiv to
   * dropdown select list (li's of which do not have identifiers).
   * This requires text to be distinct.
   * @private {!Object<!visflow.Scale>}
   */
  this.textToScale_ = {};
  this.list_.forEach(function(scale) {
    this.textToScale_[scale.text] = scale;
  }, this);
};

visflow.utils.inherit(visflow.ColorScaleSelect, visflow.Select);

/** @private @const {number} */
visflow.ColorScaleSelect.prototype.SEARCH_DELAY_ = 20;

/** @inheritDoc */
visflow.ColorScaleSelect.prototype.init_ = function() {
  visflow.ColorScaleSelect.base.init_.call(this);

  this.select2_.on('select2:open', function() {
    var listId = this.container_.find('.select2-selection')
      .attr('aria-owns');
    var list = $('#' + listId);
    this.addGradients_(list);
    $('.select2-search__field').keydown(function() {
      // The list item may not be immediately refreshed, and keydown handler
      // needs to wait a bit. Ideally we should wait for select2:search event
      // but it seems that select2 4.0 doesn't have such event.
      setTimeout(function() {
        this.addGradients_(list);
      }.bind(this), this.SEARCH_DELAY_);
    }.bind(this));
  }.bind(this));
  this.showSelected_();
  this.select2_.on('change', function() {
    this.showSelected_();
  }.bind(this));
};

/**
 * Adds gradient divs to the select2 color scale list.
 * @param {!jQuery} list
 * @private
 */
visflow.ColorScaleSelect.prototype.addGradients_ = function(list) {
  list.children('li').not('.loading-results')
    .each(function(index, li) {
      var text = $(li).text();
      var scale = this.textToScale_[text];
      if (scale != null) {
        if ($(li).children('.gradient-div').length == 0) {
          $(scale.gradientDiv).clone().appendTo(li);
        }
      }
    }.bind(this));
};

/**
 * Shows selected color scale in the select list.
 */
visflow.ColorScaleSelect.prototype.showSelected_ = function() {
  var rendered = this.container_.find('.select2-selection__rendered');
  var text = $(rendered).text();
  var scale = this.textToScale_[text];
  $(scale.gradientDiv).clone().appendTo(rendered);
};
