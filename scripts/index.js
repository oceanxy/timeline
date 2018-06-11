var $timeline = undefined,
  para = {
    timelineCon: '.timeline-con',
    firstMenu: '.year',
    secondMenu: '.day',
    zIndex: 0,
    zIndexHover: 0,
    textPosition: [],
    textWidth: []
  }

function timeline(id) {
  this.id = id || 'timeline'
  this.scrollWidth = 0
  para.zIndex = 100
  para.textPosition = []
  $timeline = $('#' + this.id)
  this.init()
}

timeline.prototype.init = function() {
  this.layout()
  this._show()
  this._event.thing_hover()
}

timeline.prototype.layout = function() {
  this.setScrollWidth()
  this.setTextPosition()
  $timeline.find(para.firstMenu).each(function(i, e) {
    if($(e).prev().is(para.secondMenu)) {
      $(e).before('<li class=\'arrow\'><span></span></li>')
    }
  })
  $timeline.find(para.timelineCon).append('<li class=\'arrow\'><span></span></li>')
}

timeline.prototype.setScrollWidth = function() {
  var _this = this
  $timeline.find('li').each(function(i, e) {
    if($(e).is(para.firstMenu)) {
      _this.scrollWidth += $(e).width() + 10
    } else if($(e).is(para.secondMenu)) {
      para.textPosition.push(_this.scrollWidth)
      _this.scrollWidth += $(e).width()
      para.textWidth.push($(e).find('.thing').width())
      $(e).find('.thing').css({'z-index': para.zIndex++})
    }
  })
  $timeline.find(para.timelineCon).width(this.scrollWidth)
}

timeline.prototype.setTextPosition = function() {
  var second = $timeline.find('li.day')
  $timeline.find('.thing').wrap('<span class=\'textLine\'></span>')
  second.each(function(i, e) {
    if(i == 0) {
      $(e).find('.textLine').data('height', 15)
    } else {
      if(i == 1 && (para.textWidth[i - 1] + para.textPosition[i - 1]) > para.textPosition[i]) {
        $(e).find('.textLine').data('height', second.eq(i - 1).find('.textLine').data('height') + 45)
      } else {
        if(i == 2) {
          if((para.textWidth[i - 1] + para.textPosition[i - 1]) <= para.textPosition[i] && (para.textWidth[i - 2] + para.textPosition[i - 2]) > para.textPosition[i]) {
            $(e).find('.textLine').data('height', 60)
          } else if((para.textWidth[i - 1] + para.textPosition[i - 1]) > para.textPosition[i] && (para.textWidth[i - 2] + para.textPosition[i - 2]) > para.textPosition[i]) {
            $(e).find('.textLine').data('height', 105)
          } else {
            $(e).find('.textLine').data('height', 15)
          }
        } else {
          if(i > 2 &&
            (para.textWidth[i - 2] + para.textPosition[i - 2]) > para.textPosition[i] && (para.textWidth[i - 1] + para.textPosition[i - 1]) > para.textPosition[i]) {
            if(second.eq(i - 1).find('.textLine').data('height') > 15 && second.eq(i - 2)
              .find('.textLine')
              .data('height') > 15) {
              $(e).find('.textLine').data('height', 15)
            } else if(second.eq(i - 1).find('.textLine').data('height') == 15) {
              if(second.eq(i - 2).find('.textLine').data('height') == 60) {
                $(e).find('.textLine').data('height', 105)
              } else {
                $(e).find('.textLine').data('height', 60)
              }
            } else if(second.eq(i - 1).find('.textLine').data('height') == 60) {
              if(second.eq(i - 2).find('.textLine').data('height') == 15) {
                $(e).find('.textLine').data('height', 105)
              } else {
                $(e).find('.textLine').data('height', 15)
              }
            } else {
              if(second.eq(i - 2).find('.textLine').data('height') == 15) {
                $(e).find('.textLine').data('height', 60)
              } else {
                $(e).find('.textLine').data('height', 15)
              }
            }
          } else if(i > 2 &&
            (para.textWidth[i - 1] + para.textPosition[i - 1]) > para.textPosition[i] &&
            (para.textWidth[i - 2] + para.textPosition[i - 2]) <= para.textPosition[i]) {
            if(second.eq(i - 1).find('.textLine').data('height') == 15) {
              $(e).find('.textLine').data('height', 60)
            } else {
              $(e).find('.textLine').data('height', 15)
            }
          } else {
            $(e).find('.textLine').data('height', 15)
          }
        }
      }
    }
  })
}

timeline.prototype._show = function() {
  $timeline.find('.time-line').animate({
    width: this.scrollWidth,
    opacity: 1
  }, 800)
  $timeline.find('li').each(function(i, e) {
    setTimeout(function() {
      if($(e).is(para.secondMenu)) {
        $(e).find('.textLine').animate({'height': $(e).find('.textLine').data('height')}, 800, function() {
          $(e).find('.thing').animate({opacity: 1}, 500)
        })
      }
      $(e).animate({'opacity': 1}, 500)
    }, i * 100)
  })
}

timeline.prototype._event = {
  thing_hover: function() {
    $timeline.find('.thing').hover(function() {
      para.zIndexHover = $(this).css('z-index')
      $(this).css({'z-index': para.zIndex})
    }, function() {
      $(this).css({'z-index': para.zIndexHover})
    })
  }
}
